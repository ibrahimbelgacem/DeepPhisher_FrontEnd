import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';
import { HttpHeaders } from '@angular/common/http';
import { RoleService } from '../_services/role.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  users: any[] = [];
  selectedUserId?: string;
  roles: string[] = [];
  availableRoles = ['ROLE_USER', 'ROLE_ADMIN'];
  selectedUser: any;


  constructor(private RoleService: RoleService,private userService: UserService,private storageService: StorageService) { }

  ngOnInit(): void {
    this.loadUsers();
    const token = this.storageService.getToken(); // Use StorageService to get the token
    console.log('token user', this.storageService.getToken());
    if (!token) {
      console.log('Token not found in local storage');
      this.content = 'You are not logged in. Please log in to access this content.';
      return;
    }

    console.log('token on init', token);
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    
  }
  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: data => {
        this.users = data;
      },
      error: err => {
        console.error('Error fetching users:', err);
      }
    });
  }

  updateRoles(): void {
    //this.selectedUser = user;
    console.log('check selected user:', this.selectedUserId, 'with roles:', this.roles);
    if (this.selectedUser.username && this.roles.length > 0) {
      this.RoleService.updateUserRole(this.selectedUser.id, this.roles).subscribe({
        next: res => {
          console.log('Roles updated successfully:', res);
          this.loadUsers(); // Refresh the user list
        },
        error: err => {
          console.error('Error updating roles:', err);
        }
      });
    } else {
      console.error('Please select a user and at least one role.');
    }
  }

  onRoleChange(event: any): void {
  const role = event.target.value;
  if (event.target.checked) {
    this.roles.push(role);
  } else {
    this.roles = this.roles.filter(r => r !== role);
  }
  console.log('Selected roles:', this.roles);
}


openRoleForm(user: any): void {
  this.selectedUser = user;
  this.roles = user.roles.map((role: any) => role.name); // Pre-select current roles
  console.log('Selected user for role update:', this.selectedUser);
}
cancelUpdate(): void {
  this.selectedUser = null;
  this.roles = [];
}

getRoleNames(roles: any[]): string {
  return roles.map(role => role.name).join(', ');
}
}
