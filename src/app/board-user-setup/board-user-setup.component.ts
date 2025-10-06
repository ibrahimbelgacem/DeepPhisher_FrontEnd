import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.serve';

@Component({
  selector: 'app-user-setup',
  templateUrl: './board-user-setup.component.html',
})
export class UserSetupComponent implements OnInit {
  showForm = false;
  userData: any = { username: '', appEmail: '', appPassword: '' };

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    try {
      const user = await this.authService.getUserInfo();
      console.log('User Keycloak:', user);
      this.userData.username = user.preferred_username;

    interface BackendCheckResponse {
        exists: boolean;
    }

    interface UserInfo {
        preferred_username: string;
        [key: string]: any;
    }

                this.authService.checkUserInBackend(user.preferred_username).subscribe({
  next: (res: BackendCheckResponse) => {
    if (!res.exists) {
      this.showForm = true; 
    } else {
     
      this.router.navigate(['/home']); 
    }
  },
                    error: (err: unknown) => {
                        console.error('Erreur backend:', err);
                        this.showForm = true; 
                    }
                });
    } catch (err) {
      console.error('Erreur récupération user Keycloak:', err);
    }
  }

  submitForm() {
    interface CreateUserResponse {
      // Add properties as needed based on backend response
      success?: boolean;
      message?: string;
      [key: string]: any;
    }

    this.authService.createUserInBackend(this.userData).subscribe({
      next: (res: CreateUserResponse) => {
        console.log('Utilisateur créé:', res);
        this.showForm = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err: unknown) => console.error('Erreur création user:', err)
    });
  }
}
