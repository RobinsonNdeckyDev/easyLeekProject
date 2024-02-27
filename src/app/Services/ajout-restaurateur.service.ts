import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AjoutRestaurateurService {
  private restaurantApi = apiUrl;
  
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    } else {
      console.error('Token non disponible.');
      throw new Error('Token non disponible.');
    }
  }  
  getListeRestaurateurs(): Observable<any[]> {
    const restaurateursUrl = apiUrl + '/auth/restaurant/list/all';
    return this.http.get<any[]>(restaurateursUrl, { headers: this.getHeaders() });
  }  

  ajouterRestaurateur(newResto: any): Observable<any> {
    const registerRestoUrl = `${apiUrl}/auth/restaurant/register`;
    return this.http.post(registerRestoUrl, newResto, {
      headers: this.getHeaders(),
    });
  }
  
  desactiverRestaurant(id: string): Observable<any> {
    const blockUrl = `${apiUrl}/auth/restaurant/compte/block/${id}`;
    return this.http.post(blockUrl, {}, { headers: this.getHeaders() });
  }
  getListeRestaurateursBloquer(): Observable<any[]> {
    const restaurateurBloquersUrl = apiUrl + '/auth/restaurant/list/blocked';
    return this.http.get<any[]>(restaurateurBloquersUrl, { headers: this.getHeaders() });
  }  

  activerRestaurant(id: string): Observable<any> {
    const unblockUrl = `${apiUrl}/auth/restaurant/compte/unblock/${id}`;
    return this.http.post(unblockUrl, {}, { headers: this.getHeaders() });
  }

  getRestaurantDetails(id: string): Observable<any> {
    const detailsUrl = `${apiUrl}/auth/restaurant/details/${id}`;
    return this.http.get(detailsUrl, { headers: this.getHeaders() });
}
 

  getListeRestaurateursActive(): Observable<any[]> {
    const restaurateursUnblockUrl = apiUrl + '/auth/restaurant/list/unblocked';
    return this.http.get<any[]>(restaurateursUnblockUrl, { headers: this.getHeaders() });
  }  

  getListeRestaurateursPourtous(): Observable<any[]> {
    const restaurateursUrl = apiUrl + '/restaurant/list/';
    return this.http.get<any[]>(restaurateursUrl);
  }
  getRestaurantDetailsUtilisateur(id: string): Observable<any> {
    const detailsUrl = `${apiUrl}/restaurant/details/${id}`;
    return this.http.get(detailsUrl);
}

getListeRestaurateursPour(restaurantId:string): Observable<any> {
  const restaurateursUrl = `${apiUrl}/plat/list/byrestaurant/${restaurantId}`;
  return this.http.get<any[]>(restaurateursUrl);
}
}
