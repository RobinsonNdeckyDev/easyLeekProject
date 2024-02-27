import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { CategorieService } from 'src/app/Services/categorie.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories: any[] = [];
  nomCategorie: string = '';
  editingCategory: any = {};
  editedType: string = '';
  editImage!: File;
  image!: File;
  type: any;
  dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject();

  constructor(private categorieService: CategorieService, private storage: AngularFireStorage) { }

  // Initialisation ngOnInit
  ngOnInit(): void {
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      pageLength: 5,
      pagingType: 'simple_numbers',
      info: false,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',

        paginate: {
          first: '<<', // Personnalise le texte de la flèche pour la première page
          previous: '<', // Personnalise le texte de la flèche pour la page précédente
          next: '>', // Personnalise le texte de la flèche pour la page suivante
          last: '>>', // Personnalise le texte de la flèche pour la dernière page
        },
      },
    };

    this.getAllCategories();

  }

  // Récupération de toutes les categories
  getAllCategories() {
    this.categorieService.getAllCategories().subscribe((response: any) => {
      console.log("La liste des categories", response.data)
      this.categories = response.data;
    });
  }


  deletecategorie(categorieId: number) {
    console.log("c'est la categorie ", categorieId);
    this.categorieService.deletecategorie(categorieId).subscribe(
      (response: any) => {
        console.log("Catégorie a supprimée", response);
        // this.getAllCategories();
    },
    (error) => {
      console.log(error);
    }
    );
}

  saveChanges() {
    console.log("Type modifié :", this.editedType);
    const updatedCategory = {
      type: this.editedType,
      image: this.editImage || this.editingCategory.image,
    };
    // console.log("Catégorie mise à jour :", updatedCategory);
  
    // // Vérifiez la console pour vous assurer que this.editingCategory.id a une valeur valide ici
    // console.log("ID de la catégorie à mettre à jour :", this.editingCategory);
  
    // Assurez-vous que this.editingCategory.id a une valeur valide ici avant d'appeler updateCategory
    if (this.editingCategory) {
      if (this.editImage) {
        // Si l'image est modifiée, téléchargez la nouvelle image dans Firebase Storage
        const filePath = 'categorie/' + this.editImage.name;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.editImage);
  
        task.snapshotChanges().subscribe((snapshot: any) => {
          if (snapshot.state === 'success') {
            fileRef.getDownloadURL().subscribe((downloadURL) => {
              updatedCategory.image = downloadURL;
              this.updateCategory(this.editingCategory, updatedCategory);
            });
          }
        });
      } else {
        // Si l'image n'est pas modifiée, mettez à jour la catégorie sans télécharger une nouvelle image
        this.updateCategory(this.editingCategory, updatedCategory);
      }
    } else {
      console.error("L'ID de la catégorie est indéfini lors de l'appel à updateCategory.");
    }
  }
  

  editcategorieModal(category: any) {

    this.editingCategory = category;
    this.editedType = category.type;

    // Vérifiez la console pour vous assurer que editingCategory a un identifiant valide
    console.log("Editing Category:", this.editingCategory);
    this.categorieService.getSingleCategory(category).subscribe((response: any) => {
      this.editedType = response.data.type;
      this.editImage = response.data.image;
    });
  }


  updateCategory(id: number, updatedCategory: any) {
    console.log("c'est l'id et le update", id , updatedCategory);
    this.categorieService.editcategorie(id, updatedCategory).subscribe(
      (response) => {
        console.log('Response after updating category:', response);
        // updatedCategory=response
        this.getAllCategories();
      },
      (error) => {
        console.log('Error updating category:', error);
      }
    );
  }


  fichierAdd: any;


  upload(event: any) {
    this.fichierAdd = event.target.files[0];
    console.log(this.fichierAdd);
  }

  save() {
    if (this.fichierAdd) {
      const filePath = 'categorie/' + this.fichierAdd.name;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.fichierAdd);

      task.snapshotChanges().subscribe((snapshot: any) => {
        if (snapshot.state === 'success') {
          fileRef.getDownloadURL().subscribe((downloadURL) => {
            this.image = downloadURL;
            this.addcategorie();
          });
        }
      });
    }
  }

  addcategorie() {
    let newCategorie = {
      type: this.type,
      image: this.image,
    };

    console.log('newPlat: ', newCategorie);

    this.categorieService.addcategorie(newCategorie).subscribe(
      (response) => {
        console.log('response après ajout du categorie: ', response);
        this.categories = response
        this.getAllCategories();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
