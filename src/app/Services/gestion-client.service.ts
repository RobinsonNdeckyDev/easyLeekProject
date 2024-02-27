import { Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionClientService {

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
  getListeClient(): Observable<any[]> {
    const restaurateursUrl = apiUrl + '/auth/client/list/all';
    return this.http.get<any[]>(restaurateursUrl, { headers: this.getHeaders() });
  }  

}
