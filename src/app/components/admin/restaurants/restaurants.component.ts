import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AjoutRestaurateurService } from 'src/app/Services/ajout-restaurateur.service';
import { CategorieService } from 'src/app/Services/categorie.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
})
export class RestaurantsComponent {
  dtOptions: DataTables.Settings = {};

  restaurateurs: any[] = [];
  detailrestaurateur: any = {};
  categories: any;
  users: any;
 
    name : string = '';
    adresse: string = '';
    email: string ='';
    phone: any = '';
    password:string= '';
    categorie_id: any= '';
    image :any= '';
    description :string ="";
  
    restaurateur: {
      id: string;
      name: string;
      isBlocked: boolean;
    } = {
      id: '',
      name: '',
      isBlocked: false
    };
  categorieTypes: string[] = [];


  constructor(private ajoutRestaurateurService: AjoutRestaurateurService , private categorieService :CategorieService , private storage: AngularFireStorage) {}

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
    this.getListeRestaurateurs();
    this.getAllCategories();
  }
   // Validate email format
validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number format
validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^(70|75|76|77|78)[0-9]{7}$/;
  return phoneRegex.test(phone);
}
  getListeRestaurateurs() {
    this.ajoutRestaurateurService.getListeRestaurateurs().subscribe((response: any) => {
      console.log("Regarder", response)
      this.restaurateurs = response.data;
    });
  }
  getAllCategories() {
    this.categorieService.getAllCategories().subscribe(
      (categories: any) => {
        this.categories = categories.data;
        // console.log( 'revoire ok',categories.data)
        this.categorieTypes = categories.map((categorie: any) => categorie.type);
        // console.log(categories.type)
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des catégories :",
          error
        );
      }
    );
  }
  

    getDetailsRestaurant(restaurateur: any): void {
      // console.log('Restaurateur:', restaurateur);
      this.ajoutRestaurateurService.getRestaurantDetails(restaurateur.id).subscribe(
         (details) => {
          // console.log("la reponse du detail",details)
            this.name = details.data.name;
            this.adresse = details.data.adresse;
            this.phone = details.data.phone;
         },
         (error) => {
            console.error('Erreur lors de la récupération des détails du restaurant', error);
         }
      );
   }
   
desactiverRestaurant(restaurateur: any): void {
      Swal.fire({
        title: 'Êtes-vous sûr(e) de vouloir désactiver ce restaurant ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, désactiver',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          // Appel de la méthode de désactivation du service
          this.ajoutRestaurateurService.desactiverRestaurant(restaurateur.id).subscribe(
            (response) => {
              // console.log('Restaurant désactivé avec succès', response);
              // Ajoutez ici le code pour mettre à jour la liste des restaurateurs ou effectuer d'autres actions si nécessaire.
            },
            (error) => {
              console.error('Erreur lors de la désactivation du restaurant', error);
              // Ajoutez ici le code pour gérer l'erreur, par exemple, afficher un message à l'utilisateur.
            }
          );
        }
      });
    }


activerRestaurant(restaurateur: any): void {
      Swal.fire({
        title: 'Êtes-vous sûr(e) de vouloir débloquer ce restaurant ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, débloquer',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          // Call the method to unlock the restaurant
          this.ajoutRestaurateurService.activerRestaurant(restaurateur.id).subscribe(
            (response) => {
              // console.log('Restaurant débloqué avec succès', response);
              // Update the icon or perform other actions if needed
              restaurateur.isBlocked = false; // Assuming there's a property to track if the restaurant is blocked
            },
            (error) => {
              console.error('Erreur lors du déblocage du restaurant', error);
              // Handle error as needed
            }
          );
        }
      });
    }

    toggleBlockStatus(): void {
      this.restaurateur.isBlocked = !this.restaurateur.isBlocked;
    }


    fichierAdd: any;


    upload(event: any) {
      this.fichierAdd = event.target.files[0];
      console.log(this.fichierAdd);
    }
  
    save() {
      if (this.fichierAdd) {
        const filePath = 'restaurateur/' + this.fichierAdd.name;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.fichierAdd);
  
        task.snapshotChanges().subscribe((snapshot: any) => {
          if (snapshot.state === 'success') {
            fileRef.getDownloadURL().subscribe((downloadURL) => {
              this.image = downloadURL;
              this.ajouterRestaurant();
            });
          }
        });
      }
    }



    ajouterRestaurant() {
      let newResto = {
        name: this.name,
        email: this.email,
        adresse: this.adresse,
        phone: this.phone,
        password: this.password,
        categorie_id:this.categorie_id,
        image: this.image,
        description :this.description
      };
  
      
      console.log('les chose entree:', newResto);
  
      this.ajoutRestaurateurService.ajouterRestaurateur(newResto).subscribe(
        (response) => {
          console.log('Réponse d\'inscription:', response);
          this.restaurateurs = response.data;
          // this.getListeRestaurateurs();
          // document.getElementById("close-modal")?.click();
        },
      );
      }
  }

