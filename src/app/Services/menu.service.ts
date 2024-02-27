import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root',
})
export class PlatService {
  private plattest=apiUrl
  private menuUrl = apiUrl + '/auth/menu';
  private platUrl = apiUrl + '/auth/plat';
  

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getRestaurantList(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.platUrl}/list/restaurant`, { headers });
  }
  getMenus(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.plattest}/auth/restaurant/menu/list`, { headers });
  }
  
  addMenu(newmenu: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.menuUrl}/store`, { titre : newmenu}, { headers });
  }

  editMenu(menuId: string, newTitre: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.menuUrl}/update/${menuId}`, { titre: newTitre }, { headers });
  }

  getMenu(menuId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.menuUrl}/show/${menuId}`, { headers });
  }

  deleteMenu(menuId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.menuUrl}/delete/${menuId}`, { headers });
  }
  getMenuDetails(menuId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.menuUrl}/show/${menuId}`, { headers });
  }

  getPlatsForMenuUtilisateur(menuId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.plattest}/plat/list/${menuId}`);
  }
  
  getPlatsTotalresto(restaurant_id:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.plattest}/plat/list/byrestaurant/${restaurant_id}`);
  }
  getMenusUtilisateur(restaurant_id :any): Observable<any[]> {
    return this.http.get<any[]>(`${this.plattest}/byrestaurant/menu/list/${restaurant_id}`);
  }
  // Route::get('/byrestaurant/menu/list/{restaurant_id}', [MenuController::class, 'listMenubyRestaurant']);


  }
