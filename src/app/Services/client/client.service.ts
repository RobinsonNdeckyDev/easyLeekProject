import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../apiUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientUrl = apiUrl;

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

  constructor(private http: HttpClient) {}

  getListeClients(): Observable<any[]> {
    const restaurateursUrl = this.clientUrl + '/auth/client/list/all';
    return this.http.get<any[]>(restaurateursUrl, { headers: this.getHeaders() });
  }  

  blocked(clientId: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.clientUrl}/auth/client/compte/block/${clientId}`;
    return this.http.post(url, { headers: this.getHeaders() });
}
disblocked(clientId: number): Observable<any> {
  const headers = this.getHeaders();
  const url = `${this.clientUrl}/auth/client/compte/unblock/${clientId}`;
  return this.http.post(url, { headers: this.getHeaders() });
}

envoyerMessageContact(newMessage: any): Observable<any> {
  const registerRestoUrl = `${apiUrl}/message/to/admin`;
  return this.http.post(registerRestoUrl, newMessage, {
    headers: this.getHeaders(),
  });
}
detailclient(clientId: number): Observable<any>{
  const headers = this.getHeaders();
    const detailsUrl = `${this.clientUrl}/auth/client/details/${clientId}`;
    return this.http.get(detailsUrl, { headers: this.getHeaders() });
}
messageRecus(): Observable<any[]> {
  const messageUrls = this.clientUrl + '/auth/message/list';
  return this.http.get<any[]>(messageUrls, { headers: this.getHeaders() });
} 
// get('/message/list
}
// /client/details/{id}
// Route::get('/client/list/all', [UserController::class, 'listAllClient']);
// Route::post('/message/to/admin', [MessageController::class, 'messageToAdmin']);

