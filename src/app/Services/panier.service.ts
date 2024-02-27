import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import Swal from 'sweetalert2';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class PanierService {



  constructor(private http: HttpClient ,private router:Router) { this.chargerPanier(); }

  private panier: any[] = [];
  private platsUrl= apiUrl

  private isUserLoggedIn(): Observable<boolean> {
    // Vérifiez si l'utilisateur est connecté localement
    const token = localStorage.getItem('token');
  
    if (!token) {
      // Aucun token n'est présent, l'utilisateur n'est pas connecté
      return of(false);
    }
  
    // Vérifiez si l'utilisateur est connecté côté serveur
    return this.checkUserLogin();
  }
  
  private checkUserLogin(): Observable<boolean> {
    const checkLoginUrl = `${this.platsUrl}/user/login`;
  
    return this.http.get<boolean>(checkLoginUrl, { headers: this.getHeaders() }).pipe(
      catchError(() => of(false)) 
    );
  }
  
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
  
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
  }
  
  
  

  message(title: any, icon: any, message: any) {
    Swal.fire({
      title: title,
      text: message,
      icon: icon
    });
  }

  ajouterAuPanier(plat: any, quantite = 1) {
    const platExistant = this.panier.find(item => item.id === plat.id);

    if (platExistant) {
      platExistant.quantite += quantite;
    } else {
      this.panier.push({ ...plat, quantite });
    }

    this.sauvegarderPanier();
    this.message('Succès', 'success', 'Plat ajouté au panier.');
  }



  passerCommande() :Observable<any> {
    const headers = this.getHeaders();
    const commande = { plats: this.panier,};
    console.log("c'est commendjnjn", commande)
    return this.http.get<any[]>(`${this.platsUrl}/auth/commande/list`, { headers }).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des commandes utilisateur:', error);
        return of([]); 
      })
    );
  }

  envoyerCommande(commande: any): Observable<any> {
    const headers = this.getHeaders();
    console.log("C'est commande :", commande);
    return this.http.post<any>(`${this.platsUrl}/auth/commande/store`, commande, { headers }).pipe(
      catchError((error) => {
        console.error('Erreur lors de l\'envoi de la commande :', error);
        throw error;
      })
    );
  }
  
  



  viderPanier() {
    this.panier = [];
    this.sauvegarderPanier();
  }

  getPanier(): any[] {
    return this.panier;
  }

  private sauvegarderPanier() {
    localStorage.setItem('panier', JSON.stringify(this.panier));
  }

  private chargerPanier() {
    const panierString = localStorage.getItem('panier');
    if (panierString) {
      this.panier = JSON.parse(panierString);
    }
  }


  diminuerQuantite(plat: any) {
    const index = this.panier.findIndex((item) => item.id === plat.id);

    if (index !== -1) {
      if (this.panier[index].quantite > 1) {
        this.panier[index].quantite--;
        this.sauvegarderPanier();
      } else {
        this.supprimerDuPanier(plat);
      }
    }
  }

  augmenterQuantite(plat: any) {
    const index = this.panier.findIndex((item) => item.id === plat.id);

    if (index !== -1) {
      this.panier[index].quantite++;
      this.sauvegarderPanier();
    }
  }

  supprimerDuPanier(plat: any) {
    this.panier = this.panier.filter((item) => item.id !== plat.id);
    this.sauvegarderPanier();
  }


  
  getUserCommandes(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.platsUrl}/auth/commande/list`, { headers });
  }
}

  

