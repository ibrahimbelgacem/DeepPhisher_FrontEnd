import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StorageService } from './storage.service';

const API_URL = 'http://localhost:8082/api/test/';
const API_URL_users = 'http://localhost:8082/api/auth/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  constructor(private http: HttpClient,private storageService: StorageService) {
    console.log('Current token:', this.storageService.getToken()); // Debug token
  }
  
 /* private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('USER_KEY');
    if (!token) {
        throw new Error('No authentication token found');
    }
    return new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });
}*/

  getPublicContent(): Observable<any> {
    console.log('Current token:', this.storageService.getToken()); // Debug token
    const token = this.storageService.getToken();
        
        if (!token) {
            return throwError(() => new Error('No authentication token found'));
        }

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get(API_URL + 'all', {headers, responseType: 'text' });
  
  }

  getAllUsers(): Observable<any> {
    const token = this.storageService.getToken();
    
    console.log('Current token list users:', this.storageService.getToken()); // Debug token
    if (!token) {
      return throwError(() => new Error('No authentication token found'));
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get(API_URL_users + 'users', { headers});
  }
  getUserBoard(): Observable<any> {
    const token = this.storageService.getToken();
     const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`});
    return this.http.get(API_URL + 'user', { headers,responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
