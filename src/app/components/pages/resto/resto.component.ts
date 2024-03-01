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
  
// Tableau restaurant
restaurants: any[] = []; 
categories :any [] =[];
categorie_id:string="";

// Attribut pour faire les recherche
searchRestaurant = '';
itemSearchs: any;


// Propriétés de pagination
itemsPerPage: number = 6;
currentPage: number = 1;

  //methode pour gerer la pagination
  // get paginatedRestaurant(): any[] {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;
  //   return this.itemSearchs ? this.itemSearchs.slice(startIndex, endIndex) : this.restaurants.slice(startIndex, endIndex);
  // }

  getAllCategories() {
    this.categorieService.getAllCategories().subscribe((response: any) => {
      // console.log("voir liste", response.data)
      this.categories = response.data;
    });
  }

  getAllRestaurants() {
    this.restaurantService.getListeRestaurateursPourtous().subscribe((response: any) => {
      console.log("listes Restaurants", response)
      this.restaurants = response.data;
    });
  }

  onRestoChange() {
    this.loadRestaurantsForSelectedCategory();
  }

  loadRestaurantsForSelectedCategory() {
    if (this.categorie_id) {
      this.categorieService.getSingleCategoryPourTous(this.categorie_id).subscribe(
        (restaurants: any) => {
          this.restaurants = restaurants.data;
          // console.log('Restaurants récupérés avec succès pour la catégorie sélectionnée!', this.restaurants);
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

  toggleForm() {
    this.DetailPlatidentifier = !this.DetailPlatidentifier;
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
        console.log('Plats récupérés avec succès!', plats.plats);
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
  
}
  
