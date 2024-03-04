import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private platsUrl= apiUrl

  constructor(private http: HttpClient ,) { }
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

  getRestoCommandes(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.platsUrl}/auth/restaurant/commande/plat/list` , { headers });
  }
  annuleruneCommandeservice(id: any): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.platsUrl}/auth/commande/refuser/${id}`, null, { headers });
  }
  accepterCommandeservice(id: any): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.platsUrl}/auth/commande/terminer/${id}`, null, { headers });
  }
  detailsRestoCommandeservice(id:any):Observable<any[]>{
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.platsUrl}/auth/restaurant/commande/show/${id}`, { headers });
  }
//  /restaurant/commande/show/{id}
// /commande/terminer/{id}
}
