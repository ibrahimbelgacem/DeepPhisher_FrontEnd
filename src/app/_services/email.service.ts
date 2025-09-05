import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://localhost:8082/api/'; // adapte selon ton controller Spring

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient, private storageService: StorageService) {
    console.log('Current token (emails):', this.storageService.getToken());
  }

  // Récupérer directement les mails classés de FastAPI via Spring Boot
  fetchMails(request: any): Observable<any[]> {
    const token = this.storageService.getToken();

    if (!token) {
      return throwError(() => new Error('No authentication token found'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // POST → /api/fetch avec email+password
    return this.http.post<{ emails: any[] }>(API_URL + 'fetch', request, { headers })
                    .pipe(
                      map(res => res.emails) // renvoie directement le tableau d'emails
                    );
  }
}
