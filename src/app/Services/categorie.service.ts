import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { apiUrl } from './apiUrl';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private categorieUrl = apiUrl ;

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
  addcategorie(newCategorie: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any[]>(`${this.categorieUrl}/auth/categorie/store`, newCategorie, { headers: headers })
      .pipe(
        catchError((error) => {
          console.error("Erreur HTTP lors de l'ajout de catégorie :", error);
          throw error;
        })
      );
  }
   
  deletecategorie(categorieId: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.categorieUrl}/auth/categorie/delete/${categorieId}`;
    return this.http.delete(url, { headers });
}

  
  editcategorie(categorieId: number, updatedCategory: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.categorieUrl}/auth/categorie/update/${categorieId}`, updatedCategory, { headers });
  }
  getSingleCategory(categorieId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.categorieUrl}/auth/categorie/show/${categorieId}`, { headers: headers });
  }
  getSingleCategoryPourTous(categorieId: string): Observable<any> {
    return this.http.get<any>(`${this.categorieUrl}/restaurant/list/${categorieId}`);
  }
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.categorieUrl}/categorie/list`);
  }
}