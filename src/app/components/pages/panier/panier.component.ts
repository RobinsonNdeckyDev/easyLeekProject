import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { AuthService } from 'src/app/Services/auth.service';
import { PanierService } from 'src/app/Services/panier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {


  adresseLivraison: string = "";
  quantite: string = "";
  constructor(private panierService: PanierService, private router: Router, private authService: AuthService) { }

  message(title: any, icon: any, message: any) {
    Swal.fire({
      title: title,
      text: message,
      icon: icon
    }).then(() => {
      Swal.close();
    });
  }


  // panier.component.ts
  get panier(): any[] {
    return this.panierService.getPanier();
  }

  diminuerQuantite(plat: any) {
    this.panierService.diminuerQuantite(plat);
  }

  augmenterQuantite(plat: any) {
    this.panierService.augmenterQuantite(plat);
  }
  supprimerDuPanier(plat: any) {
    this.panierService.supprimerDuPanier(plat);
  }


  // passerCommande() {
  //   const panier = this.panierService.getPanier();

  //   const commandes = panier.map(plat => ({
  //     plat_id: plat.id,
  //     nombrePlats: plat.quantite
  //   }));

  //   const commande = {
  //     commandes: commandes,
  //     lieuLivraison: this.adresseLivraison
  //   };

  //   this.panierService.envoyerCommande(commande).subscribe(
  //     (response) => {
  //       // console.log('Réponse de la commande :', response);
  //       this.panierService.viderPanier();
  //       this.message('Succès', 'success', 'Commande passée avec succès.');
  //       this.router.navigate(['/profil']);
  //     },
  //     (_error) => {
  //       this.message('Erreur', 'error', 'Veuillez vous connecter.');
  //       this.router.navigate(['/login']);
  //     }
  //   );
  // }

  // passerCommande() {
  //   const panier = this.panierService.getPanier();

  //   const commandes = panier.map(plat => ({
  //     plat_id: plat.id,
  //     nombrePlats: plat.quantite
  //   }));

  //   const commande = {
  //     commandes: commandes,
  //     lieuLivraison: this.adresseLivraison
  //   };

  //   this.panierService.envoyerCommande(commande).subscribe(
  //     (response ) => {
  //       console.log("je suis un trucs duu panier ", response);
  //       // Clear local storage after a successful order
  //       localStorage.clear();

  //       this.panierService.viderPanier();
  //       this.message('Succès', 'success', 'Commande passée avec succès.');
  //       this.router.navigate(['/profil']);
  //     },
  //     (_error) => {
  //       console.log("error de error", error);
  //       this.message('Erreur', 'error', 'Veuillez vous connecter.');
  //       this.router.navigate(['/login']);
  //     }
  //   );
  // }

  passerCommande() {
    // Vérifier si l'utilisateur est connecté
    if (this.authService.isLoggedIn()) {

      const panier = this.panierService.getPanier();

      const commandes = panier.map(plat => ({
        plat_id: plat.id,
        nombrePlats: plat.quantite
      }));

      const commande = {
        commandes: commandes,
        lieuLivraison: this.adresseLivraison
      };

      this.panierService.envoyerCommande(commande).subscribe(
        (response) => {
          // console.log("je suis un truc du panier ", response);
          
          this.message('Succès', 'success', 'Commande passée avec succès.');
          this.router.navigate(['/profil']);
          this.panierService.viderPanier();
        },
        // (error) => {
        //   console.log("erreur de l'erreur", error);
        //   this.message('Erreur', 'error', 'Une erreur s\'est produite lors de la commande.');
        //   // Vous pouvez gérer les erreurs spécifiques liées à la commande ici
        // }
      );
      
     
    } else if(!this.authService.isLoggedIn()){
      this.message('Erreur', 'error', 'veuillez-vous connecter pour termine la commande.');
       this.router.navigate(['/login']);
      return;
    }


  }




  calculerTotal() {
    let total = 0;

    for (const item of this.panierService.getPanier()) {
      total += item.prix * item.quantite;
    }

    return total;
  }
  calculerTotalquatite(): number {
    let totalQuantite = 0;

    for (const item of this.panierService.getPanier()) {
      totalQuantite += item.quantite;
    }

    return totalQuantite;
  }

}
