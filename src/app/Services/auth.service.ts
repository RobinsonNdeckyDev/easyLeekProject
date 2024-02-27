import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { apiUrl } from './apiUrl';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
export interface AuthResponse {
  user: {
    id: number;
    role_id: number;
  };
  token: string;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false);
  userRole = new BehaviorSubject<string>('');
  user: any;

  constructor(private http: HttpClient, private router: Router) { }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get usersRole(): Observable<string> {
    return this.userRole.asObservable();
  }
  // login(email: string, password: string): Observable<AuthResponse> {
  //   const loginUrl = `${apiUrl}/user/login`;
  //   const credentials = { email, password };

  //   return this.http.post<AuthResponse>(loginUrl, credentials).pipe(
  //     tap((response) => {
  //       this.user = response;
  //       console.log("sdfghjkldfghj", response.user );
  //       this.loggedIn.next(true);
  //       // this.userRole.next(response.user.role_id.toString
  //     localStorage.setItem('user', JSON.stringify(response.user));
  //     localStorage.setItem('token', response.token);
  //     })
  //   );
  // }

  login(email: string, password: string): Observable<AuthResponse> {
    const loginUrl = `${apiUrl}/user/login`;
    const credentials = { email, password };
  
    return this.http.post<AuthResponse>(loginUrl, credentials).pipe(
      tap((response) => {
        this.user = response.user;
        console.log("User: ", this.user);
  
        // Mise à jour du BehaviorSubject pour isLoggedIn
        this.loggedIn.next(true);
  
        // Mise à jour du BehaviorSubject pour userRole
        this.userRole.next(response.user.role_id.toString());
  
        console.log("isLoggedIn: ", this.loggedIn.value); // Ajoutez cette ligne pour le débogage
  
        // Stocker les informations de l'utilisateur dans le stockage local
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
      })
    );
  }
  
  

  register(name: string, email: string, adresse: string, phone: string, password: string,): Observable<any> {
    const registerUrl = `${apiUrl}/user/register`;
    const userData = { name, email, adresse, phone, password };
    return this.http.post(registerUrl, userData);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Mettez à jour les valeurs des BehaviorSubject
    this.loggedIn.next(false);
    this.userRole.next('');

    // Naviguer vers la page de connexion ou toute autre page souhaitée
    this.router.navigate(['/login']);
  }

  getMenusForUser(): Observable<any[]> {
    // Appeler l'API pour récupérer les menus associés à l'utilisateur
    const userId = this.user.id;
    // En utilisant userId pour filtrer les données côté client
    // ...
    return this.http.get<any[]>(`${apiUrl}/menus?userId=${userId}`);
  }

  getPlatsForUser(): Observable<any[]> {
    // Appeler l'API pour récupérer les plats associés à l'utilisateur
    const userId = this.user.id;
    // En utilisant userId pour filtrer les données côté client
    // ...
    return this.http.get<any[]>(`${apiUrl}/plats?userId=${userId}`);
  }
  
}

 
