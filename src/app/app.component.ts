import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { EventBusService } from './_shared/event-bus.service';
import { KeycloakService } from './keycloak/keycloak.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private eventBusService: EventBusService,
    private router: Router,
    private keycloakService: KeycloakService
  ) {}

  async ngOnInit(): Promise<void> {
    console.log('=== DÉBUT DÉBOGAGE ===');

    
    this.isLoggedIn = await this.storageService.isLoggedIn();
  

    console.log('1. isLoggedIn:', this.isLoggedIn);
    const user = await this.keycloakService.getUserInfo();
    
    this.router.navigate(['/user-setup']);
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      console.log('2. User complet:', user);

      this.roles = user?.realm_access?.roles || [];
      console.log('3. Rôles de l’utilisateur:', this.roles);

      this.showAdminBoard = this.roles.includes('client_admin');
      this.showModeratorBoard = this.roles.includes('client_user');

      this.username = user?.preferred_username || user?.username;
    }

    
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }
 logout(): void {
    this.keycloakService.logout();
  }
  }

