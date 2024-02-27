import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  private userUrl = `${apiUrl}/auth/user/me`;

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.userUrl , { headers });
  }
}

