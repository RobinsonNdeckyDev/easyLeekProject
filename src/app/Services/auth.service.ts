import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
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


   // Is connected pour vérifier s'il est toujours connecté
   isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  // récupération du token

  getToken(): string | null {
    return localStorage.getItem('token');
  }

// guard de fou 
isAdmin(): boolean {
  const userdata = localStorage.getItem('currentUser');
  console.log("localstorage",userdata);
  const userConnectedRole = userdata ? JSON.parse(userdata).role_id : null;
  console.log('Son role est: ', userConnectedRole);
  return userConnectedRole === 1;
}

isRestaurant() {
  const userdata = localStorage.getItem('currentUser');
  console.log("localstorage",userdata);
  const userConnectedRole = userdata ? JSON.parse(userdata).role_id : null;
  console.log('Son role est: ', userConnectedRole);
  // Vérifie si le rôle est "proprietaire"
  return userConnectedRole === 2;
}

isClient() {
  const userdata = localStorage.getItem('currentUser');
  console.log("localstorage",userdata);
  const userConnectedRole = userdata ? JSON.parse(userdata).role_id : null;
  console.log('Son role est: ', userConnectedRole);
  return userConnectedRole === 3;
}

// guard de fou 



 // connexion
 login(email: string, password: string): Observable<any> {
  return this.http
    .post<any>(`${apiUrl}/user/login`, { email, password })
    .pipe(
      map((response :any) => {
        // Stocker les informations utilisateur et le token dans le stockage local
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        localStorage.setItem('token', response.access_token);
        // Démarrer le minuteur de rafraîchissement du jeton
        // this.startTokenRefreshTimer();
        return response;
      }),
      catchError((error) => {
        throw error;
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

 
