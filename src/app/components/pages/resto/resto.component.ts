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
    this.paginate(); 

  
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

  
  getAllRestaurants() {
    this.restaurantService.getListeRestaurateursPourtous().subscribe((response: any) => {
      console.log("listes Restaurants", response)
      this.restaurants = response.data;
      this.itemSearchs = this.restaurants; 
    });
  }
  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.itemSearchs = this.restaurants.slice(startIndex, endIndex);
  }
  changePage(page: number) {
    if (page === -1) {
      this.currentPage--;
    } else {
      this.currentPage = page;
    }
    this.paginate();
  }
  
  getTotalPages(): number {
    return Math.ceil(this.itemSearchs.length / this.itemsPerPage);
  }
  
  getPageNumbers(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
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
    this.loadRestaurantsForSelectedCategory();
    this.paginate();
  }
  
  loadRestaurantsForSelectedCategory() {
    if (this.categorie_id) {
      this.categorieService.getSingleCategoryPourTous(this.categorie_id).subscribe(
        (restaurants: any) => {
          this.restaurants = restaurants.data;
          this.paginate(); 
          
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
  
