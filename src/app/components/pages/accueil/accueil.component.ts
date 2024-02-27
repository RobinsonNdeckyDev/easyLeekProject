import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AjoutRestaurateurService } from 'src/app/Services/ajout-restaurateur.service';
import { CategorieService } from 'src/app/Services/categorie.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {


  categories: any[] = [];
  restaurants: any[] = [];
  categorie_id : string ="";
constructor(private categorieService: CategorieService ,private restaurantService:AjoutRestaurateurService , private router: Router) {}

ngOnInit() {
  this.getAllCategories();
  this.getListeRestaurateurs()
  // console.log("c'est le reponse du fou",this.getListeRestaurateurs)

}

getListeRestaurateurs() {
  this.restaurantService.getListeRestaurateursPourtous().subscribe((response: any) => {
    // console.log("Regarder", response)
    this.restaurants = response.data;
  });
}

getAllCategories() {
  this.categorieService.getAllCategories().subscribe((response: any) => {
    console.log("voir liste des categories", response.data)
    this.categories = response.data;
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
    this.router.navigate(['/restaurant']) ;

    // this.getAllRestaurants();
  }
}


}
