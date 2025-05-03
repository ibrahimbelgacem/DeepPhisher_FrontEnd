import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable, throwError } from 'rxjs';

const API_URL = 'http://localhost:8082/api/auth/'; // Adjust the base URL as needed

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient,private storageService: StorageService) {
      console.log('Current token:', this.storageService.getToken()); // Debug token
    }

    updateUserRole(userId: string, roles: string[]): Observable<any> {
      const token = this.storageService.getToken();
          
           if (!token) {
            return throwError(() => new Error('No authentication token found'));
          }
        
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
             'Content-Type': 'application/json'
          });
          return this.http.put(
            API_URL + 'updateRole',
            { userId, roles }, // Only include userId and roles in the body
            { headers } // Pass headers here
          );
    }
  
  
}
