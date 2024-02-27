import { Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Form } from '@angular/forms';


import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class GestionPlatService {
  private platsUrl = apiUrl + '/auth/plat';
  private platsUrlSimple = apiUrl;

  constructor(private http: HttpClient, private fireStorage: AngularFireStorage) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('message ', token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getPlatsForTotal(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http
      .get<any[]>(`${this.platsUrl}/list/restaurant/`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Erreur dans getPlatsForMenu :', error);
          throw error;
        })
      );
  }

  // Plat
  getPlatsForMenu(menuId: string): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http
      .get<any[]>(`${this.platsUrl}/list/restaurant/${menuId}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Erreur dans getPlatsForMenu :', error);
          throw error;
        })
      );
  }

  ajouterPlat(platData: any): Observable<any> {
    const registerRestoUrl = `${this.platsUrl}/store`;
    return this.http.post(registerRestoUrl, platData, {
      headers: this.getHeaders(),
    });
  }

  deletePlat(platId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.platsUrl}/delete/${platId}`, {
      headers,
    });
  }

  updatePlat(platId: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put<any>(`${this.platsUrl}/update/${platId}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error in updatePlat:', error);
          throw error;
        })
      );
  }

  getSinglePlat(platId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.platsUrl}/show/${platId}`, { headers });
  }

  getSinglePlatUtilisateur(platId: string): Observable<any> {
    return this.http.get<any>(`${this.platsUrlSimple}/plat/show/${platId}`);
  }
  getPlatsForMenuUtilisateur(menuId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.platsUrlSimple}/plat/list/${menuId}`);
  }


  // async addFile(fichier: File): Promise<string> {
  //   try {
  //     const randomFileName = `${Math.floor(Math.random() * 100000)}`;
  //     const fileref = ref(this.storage, `fichier/rapidStokProduct${randomFileName}`);
  //     const uploadTask = uploadBytesResumable(fileref, fichier);

  //     await uploadTask;

  //     return await getDownloadURL(fileref);
  //   } catch (error) {
  //     console.log(error);

  //     throw error;
  //   }
  // }

  // async addfile(fichier: File)
}
