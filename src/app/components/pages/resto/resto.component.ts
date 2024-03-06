import { Component } from '@angular/core';
import { AjoutRestaurateurService } from 'src/app/Services/ajout-restaurateur.service';
import { CategorieService } from 'src/app/Services/categorie.service';
import { PlatService } from 'src/app/Services/menu.service';
import { PanierService } from 'src/app/Services/panier.service';

@Component({
  selector: 'app-resto',
  templateUrl: './resto.component.html',
  styleUrls: ['./resto.component.css']
})
export class RestoComponent {


  constructor(private platService: PlatService , private categorieService: CategorieService ,private restaurantService:AjoutRestaurateurService , private panierService: PanierService) {}

  ngOnInit() {
    this.getAllCategories();
    this.getAllRestaurants();
    this.loadMenus(this.restaurantId);
    this.loadPlats(this.restaurantId);
    // this.getListeRestaurateurs() ;

  
  }

  restaurateurs:any []=[];
  plats :any [] = [];
  menus: any [] = [];
  selectedMenuId: string ="";
  restaurantId :string ="" ; 
  restaurant: any;
  DetailPlatidentifier :boolean =true;
  selectedRestaurantTitle: string = '';

  
// Tableau restaurant
restaurants: any[] = []; 
categories :any [] =[];
categorie_id:string="";

// Attribut pour faire les recherche
searchRestaurant = '';
itemSearchs: any;



// Attributs pour la pagination
itemsPerPage: number = 8;
currentPage: number = 1;

// Méthode pour gérer la pagination
get paginatedRestaurant(): any[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.itemSearchs ? this.itemSearchs.slice(startIndex, endIndex) : this.restaurants.slice(startIndex, endIndex);
}

// Méthode pour changer de page
changePage(page: number) {
  if (page > 0 && page <= this.getTotalPages()) {
    this.currentPage = page;
  }
}
// Méthode pour obtenir les numéros de page
getPageNumbers(): number[] {
  const totalPages = this.getTotalPages();
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}

// Méthode pour obtenir le nombre total de pages
getTotalPages(): number {
  const totalItems = this.itemSearchs ? this.itemSearchs.length : this.restaurants.length;
  return Math.ceil(totalItems / this.itemsPerPage);
}

// methode pour recherche 
filterRestaurants() {
  this.currentPage = 1; // Réinitialise la page actuelle lors de la recherche
  this.itemSearchs = this.restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(this.searchRestaurant.toLowerCase())
  );
}
 // Attributs pour faire les recherche
 searchPlats: string = '';
 filteredPlats: any[] = []; // Ajout de cette ligne

 // Propriétés de pagination pour les plats
 itemsPerPagePlats: number = 9;
 currentPagePlats: number = 1;

 // Méthode pour gérer la pagination des plats
 get paginatedPlats(): any[] {
   const startIndex = (this.currentPagePlats - 1) * this.itemsPerPagePlats;
   const endIndex = startIndex + this.itemsPerPagePlats;
   return this.filteredPlats.length > 0 ? this.filteredPlats.slice(startIndex, endIndex) : this.plats.slice(startIndex, endIndex);
 }

 // Méthode pour changer de page des plats
 changePagePlats(page: number) {
   if (page > 0 && page <= this.getTotalPagesPlats()) {
     this.currentPagePlats = page;
   }
 }

 // Méthode pour obtenir les numéros de page des plats
 getPageNumbersPlats(): number[] {
   const totalPages = this.getTotalPagesPlats();
   return Array.from({ length: totalPages }, (_, index) => index + 1);
 }

 // Méthode pour obtenir le nombre total de pages des plats
 getTotalPagesPlats(): number {
   const totalItems = this.filteredPlats.length > 0 ? this.filteredPlats.length : this.plats.length;
   return Math.ceil(totalItems / this.itemsPerPagePlats);
 }

 // Méthode pour filtrer les plats
 filterPlats() {
   this.currentPagePlats = 1; // Réinitialise la page actuelle lors de la recherche
   this.filteredPlats = this.plats.filter(plat =>
     plat.libelle.toLowerCase().includes(this.searchPlats.toLowerCase())
   );
 }

  
  getAllRestaurants() {
    this.restaurantService.getListeRestaurateursPourtous().subscribe((response: any) => {
      console.log("listes Restaurants", response)
      this.restaurants = response.data;
      this.itemSearchs = this.restaurants; 
    });
  }
  
  // ici je recupere l'ensemble de ce qui conserne le filtre 
  getAllCategories() {
    this.categorieService.getAllCategories().subscribe((response: any) => {
      // console.log("voir liste", response.data)
      this.categories = response.data;
    });
  }
  // ici je fais le filtre des AccueilRestaurantComponent par raport a categorie selectionner 
  onRestoChange() {
    console.log('Catégorie sélectionnée :', this.categorie_id);
    this.loadRestaurantsForSelectedCategory();
  }
  
  loadRestaurantsForSelectedCategory() {
    if (this.categorie_id) {
      this.categorieService.getSingleCategoryPourTous(this.categorie_id).subscribe(
        (restaurants: any) => {
          console.log('Restaurants récupérés avec succès pour la catégorie sélectionnée!', restaurants);
          this.restaurants = restaurants.data;
          this.itemSearchs = this.restaurants;  // Ajoutez cette ligne

        },
        (error) => {
          console.error("Erreur lors de la récupération des restaurants pour la catégorie sélectionnée:", error);
        }
      );
    } else {
      // If no category selected, show all restaurants
      this.getAllRestaurants();
    }
  }

  loadMenus(restaurant_id: any) {
    this.platService.getMenusUtilisateur(restaurant_id).subscribe(
      (menus: any) => {
        console.log("je suis la reponse du menu ", menus);
        this.menus = menus.menus;
      },
      (error) => {
        console.error('Error fetching menus:', error);
      }
    );
  }

  onMenuChange() {
    this.loadPlatsForSelectedMenu();
  }
  toggleForm() {
    this.DetailPlatidentifier = !this.DetailPlatidentifier;
  }


  loadPlatsForSelectedMenu() {
    if (this.selectedMenuId) {
      this.platService.getPlatsForMenuUtilisateur(this.selectedMenuId).subscribe(
        (plats: any) => {
          this.plats = plats.data;
        },
        (error) => {
          console.error('Error fetching plats for the selected menu:', error);
        }
      );
    }
  }

  loadPlats(restaurant_id: any) {
    console.log("idddd", restaurant_id);
    this.restaurantService.getListeRestaurateursPour(restaurant_id).subscribe(
      (plats: any) => {
        console.log('Plats récupérés avec succès!', plats);
        this.plats = plats.plats;
      },
      (error) => {
        console.error('Erreur lors de la récupération des plats:', error);
      }
    );
  }
  
  ajouterAuPanier(plat: any) {
    // console.log("me voila panier ", plat)
    this.panierService.ajouterAuPanier(plat);
  }
  selectRestaurant(restaurant: any): void {
    this.selectedRestaurantTitle = restaurant.name;
    // Vous pouvez également ajouter d'autres logiques ici si nécessaire
}

  
}
  
