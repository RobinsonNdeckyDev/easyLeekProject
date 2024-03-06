import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { CategorieService } from 'src/app/Services/categorie.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  categories: any[] = [];
  restaurants: any[] = [];

// Déclaration des propriétés touched

telephoneTouched: boolean = false;
confirmationTouched: boolean = false;
adresseTouched: boolean = false;
photoTouched: boolean = false;
descriptionTouched: boolean = false;



  nomCategorie: string = '';
  editingCategory: any;
  editedType: string = '';
  editImage!: File;
  
  image!: File;
  type: any;
  fichierAdd: any;
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
      // console.log("La liste des categories", response)
      this.categories = response.data;
    });
  }


//   deletecategorie(categorieId: number) {
    // console.log("c'est la categorie ", categorieId);
//     this.categorieService.deletecategorie(categorieId).subscribe(
//       (response: any) => {
        // console.log("Catégorie a supprimée", response);
//         // this.getAllCategories();
//     },
//     (error) => {
      // console.log(error);
//     }
//     );
// }


// modifier 
saveChanges() {
  const updatedCategory = {
    type: this.editedType,
    image: this.editImage,  // Assurez-vous que c'est la bonne propriété
  };
  // console.log('editedType:', this.editedType);
  // console.log('editImage:', this.editImage);

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
    // console.log("Editing Category:", this.editingCategory);
    this.categorieService.getSingleCategory(category).subscribe((response: any) => {
      // console.log("de la reponse du back sur getsingle", response);
      this.editedType = response.data.type;
      this.editImage = response.data.image;
      // console.log("voir si type retourne quelque chose ", response.data.type);
      // console.log("voir si image retourne quelque chose ", response.data.image);
    });
  }


  updateCategory(id: number, updatedCategory: any) {
    console.log("c'est l'id et le update", id , updatedCategory);
    this.categorieService.editcategorie(id, updatedCategory).subscribe(
      (response) => {
        // console.log('Response after updating category:', response);
        this.getAllCategories();
      },
      (error) => {
        // console.log('Error updating category:', error);
      }
    );
  }




  upload(event: any) {
    this.fichierAdd = event.target.files[0];
    // console.log(this.fichierAdd);
  }

  // ajouter

  save() {
    if (this.fichierAdd) {
      const filePath = 'categorie/' + this.fichierAdd.name;
      const fileRef = this.storage.ref(filePath);
      // console.log("this storage ", fileRef , filePath);
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

    // console.log('newPlat: ', newCategorie);

    this.categorieService.addcategorie(newCategorie).subscribe(
      (response) => {
        // console.log('response après ajout du categorie: ', response);
        this.categories = response
        this.getAllCategories();
      },
      (error) => {
        // console.log(error);
      }
    );
  }
  voirDetails(categorieId :any){
    this.categorieService.getSingleCategory(categorieId).subscribe((response: any) => {
      // console.log("de la reponse du back sur getsingle", response);
      this.editedType = response.data.type;
      this.editImage = response.data.image;
      // console.log("voir si type retourne quelque chose ", response.data.type);
      // console.log("voir si image retourne quelque chose ", response.data.image);
    });
  }

  getNombreRestaurantsParCategorie(categorieId: number): number {
    const restaurantsDansCategorie = this.restaurants.filter((resto: any) => resto.categorieId === categorieId);
    return restaurantsDansCategorie.length;
  }

  // Messages de validation
validationMessages: { [key: string]: string } = {};
typeTouched: boolean = false;

   // Regex type et nom
   regexPattern = /^[a-zA-Z]{5,}$/;
   // Déclaration des propriétés Empty
typeEmpty: boolean = false;
nomEmpty: boolean = false;

   // Validation nom
   // ...

// Validation nom
validatetype(): boolean {
  this.typeTouched = true;

  if (!this.type) {
    this.validationMessages['type'] = 'Le type est requis';
    this.typeEmpty = true; // Set typeEmpty to true when the field is empty
    return false;
  } else if (!this.regexPattern.test(this.type)) {
    this.validationMessages['type'] =
      'Pas de chiffres et de caractères pour le type';
    this.typeEmpty = false;
    return false;
  } else if (this.type.length < 5) { // Adjust the minimum length condition
    this.validationMessages['type'] = 'Le type est trop court';
    this.typeEmpty = false;
    return false;
  } else {
    this.validationMessages['type'] = '';
    this.typeEmpty = true; // Set typeEmpty to true when the input is correct
    return true;
  }
}

// ...

  
  }

