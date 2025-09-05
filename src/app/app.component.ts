import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
    private authService: AuthService
    
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    console.log('=== DÉBUT DÉBOGAGE ===');
    this.isLoggedIn = this.storageService.isLoggedIn();
  console.log('1. isLoggedIn:', this.isLoggedIn);
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      console.log('2. User complet:', user);
      this.roles = user.roles;
      console.log('3. Rôles de l’utilisateur:', this.roles);  

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

 /* logout(event?: MouseEvent): void {
      event?.preventDefault();
      this.authService.logout().subscribe(() => {
        this.router.navigate(['/login']);
      });
    }
  */
  
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
