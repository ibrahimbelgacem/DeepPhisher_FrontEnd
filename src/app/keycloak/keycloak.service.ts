import { Injectable } from '@angular/core';

import  Keycloak from 'keycloak-js';
@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  get keycloak(): Keycloak {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8080',
        realm: 'finlogik',
        clientId: 'front-end-app'
        
      });
    }
    return this._keycloak;
  }
  constructor() { }
  async init(): Promise<void> {
   
    console.log('Keycloak initialized');
    const authenticated = await this.keycloak.init({ onLoad: 'login-required' });
    if (authenticated) {
      console.log('User is authenticated');
    } else {
      console.log('User is not authenticated');
    }
  }
  
  public async getToken(): Promise<string | null> {
    try {
      const refreshed = await this.keycloak.updateToken(30); 
      if (refreshed) console.log('Token rafraîchi');
      return this.keycloak.token ?? null;
    } catch (err) {
      console.error('Erreur rafraîchissement token', err);
      return null;
    }
  }
  async getUserInfo(): Promise<any> {
    await this.getToken(); 
    return this.keycloak.tokenParsed;
  }

  public async logout(): Promise<void> {
    await this.keycloak.logout({
      redirectUri: window.location.origin  
    });
    localStorage.clear();
    sessionStorage.clear();
  }
} 
