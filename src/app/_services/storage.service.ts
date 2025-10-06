import { Injectable } from '@angular/core';
import { KeycloakService } from '../keycloak/keycloak.service';

const USER_KEY = 'auth-user';
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private keycloakService: KeycloakService) {}


  clean(): void {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }

  public async saveUserFromKeycloak(): Promise<void> {
    const kc = this.keycloakService.keycloak;
    if (kc && kc.tokenParsed) {
      localStorage.setItem(USER_KEY, JSON.stringify(kc.tokenParsed));
      localStorage.setItem(TOKEN_KEY, kc.token!);
      console.log('Saved user and token from Keycloak');
    }
  }

  
  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

 
  public async getToken(): Promise<string | null> {
    
    const token = await this.keycloakService.getToken();
     console.log('Token envoyé:', token);
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
    return token;
  }

  public async isLoggedIn(): Promise<boolean> {
    const kc = this.keycloakService.keycloak;
    if (kc.authenticated) {
      await this.saveUserFromKeycloak();
      return true;
    }
    return false;
  }
}
