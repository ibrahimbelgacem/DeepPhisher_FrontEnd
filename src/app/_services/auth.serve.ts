import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from '../keycloak/keycloak.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private keycloak: KeycloakService, private http: HttpClient) {}

  async getUserInfo(): Promise<any> {
    return this.keycloak.getUserInfo();
  }

  checkUserInBackend(username: string): Observable<any> {
    return this.http.get(`http://localhost:8082/api/users/${username}`);
  }

  createUserInBackend(data: any): Observable<any> {
    return this.http.post(`http://localhost:8082/api/users`, data);
  }
}
