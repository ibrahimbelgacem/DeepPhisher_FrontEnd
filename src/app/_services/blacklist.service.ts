import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable, throwError } from 'rxjs';

const API_URL = 'http://localhost:8082/api/blacklist/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class BlacklistService {

 constructor(private http: HttpClient,private storageService: StorageService) {
     console.log('Current token:', this.storageService.getToken()); // Debug token
   }
   
 
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
 
   getBlackList(): Observable<any> {
     const token = this.storageService.getToken();
     
     console.log('Current token list blacklist:', this.storageService.getToken()); // Debug token
     if (!token) {
       return throwError(() => new Error('No authentication token found'));
     }
   
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
     });
   
     return this.http.get(API_URL + 'all', { headers});
   }
   getUserBoard(): Observable<any> {
     const token = this.storageService.getToken();
      const headers = new HttpHeaders({
             'Authorization': `Bearer ${token}`});
     return this.http.get(API_URL + 'all1', { headers,responseType: 'text' });
   }
   
   getModeratorBoard(): Observable<any> {
     return this.http.get(API_URL + 'mod', { responseType: 'text' });
   }
 
   getAdminBoard(): Observable<any> {
     return this.http.get(API_URL + 'admin', { responseType: 'text' });
   }
    addToBlackList(newEntry: any): Observable<any> {
      const token = this.storageService.getToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      return this.http.post(API_URL + 'add', newEntry, { headers });
    }
    deleteBlackList(id: number): Observable<any> {
      const token = this.storageService.getToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      return this.http.delete(API_URL + 'delete/' + id, { headers });
    }
    updateBlackList(id: number, updatedEntry: any): Observable<any> {
      const token = this.storageService.getToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      return this.http.put(API_URL + 'update/' + id, updatedEntry, { headers });
    }
    getBlackListById(id: number): Observable<any> {
      const token = this.storageService.getToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      return this.http.get(API_URL + 'get/' + id, { headers });
    }
    getBlackListByName(name: string): Observable<any> {
      const token = this.storageService.getToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      return this.http.get(API_URL + 'getByName/' + name, { headers });
    }
}
