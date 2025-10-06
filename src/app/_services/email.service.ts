import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:8082/api/';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient, private storageService: StorageService) {}

 
  fetchMails(): Observable<any[]> {
    return from(this.storageService.getToken()).pipe(
      switchMap(token => {
        if (!token) return throwError(() => new Error('No authentication token found'));

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        return this.http.get<{ emails: any[] }>(API_URL + 'fetch', { headers })
          .pipe(
            map(res => res.emails),
            catchError(err => {
              console.error('Erreur chargement emails', err);
              return throwError(() => err);
            })
          );
      })
    );
  }
}
