import { Component } from '@angular/core';
import { RoleService } from '../_services/role.service';
import { BlacklistService } from '../_services/blacklist.service';
import { StorageService } from '../_services/storage.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-board-blacklist',
  templateUrl: './board-blacklist.component.html',
  styleUrls: ['./board-blacklist.component.css']
})
export class BoardBlacklistComponent {
  content?: string;
  roleAdmin: boolean | undefined;
  blacklist: any[] = [];
  selectedUserId?: string;
  roles: string[] = [];
  availableRoles = ['ROLE_USER', 'ROLE_ADMIN'];
  selectedEmail: any;
  newEntry: any = {
    senderEmail: '',
    domain: '',
    senderName: '',
    blockDate: new Date()
  };
  selectedBlacklistEntry: any;
///////search/////

filteredBlacklist = [...this.blacklist];
searchQuery = '';

onSearch() {
  this.filteredBlacklist = this.blacklist.filter(item => {
    const email = item.senderEmail ? item.senderEmail.toLowerCase() : '';
    const domain = item.domain ? item.domain.toLowerCase() : '';
    const name = item.senderName ? item.senderName.toLowerCase() : '';
    const query = this.searchQuery.toLowerCase();
    return email.includes(query) || domain.includes(query);
  });
}
//Test sonarqube scanner
//////end search/////
  constructor(private RoleService: RoleService,private blacklistService: BlacklistService,private storageService: StorageService) { }
  
    ngOnInit(): void {
      this.loadBlackList();
      const token = this.storageService.getToken(); // Use StorageService to get the token
      if (!token) {
        console.log('Token not found in local storage');
        this.content = 'You are not logged in. Please log in to access this content.';
        return;
      }
  
      console.log('token on init', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
       // Check if the user has the admin role
  //this.RoleService.getUserRoles().subscribe((roles: string[]) => {
  //  this.isAdmin = roles.includes('ROLE_ADMIN');
 // });

 const user = this.storageService.getUser();
 this.roleAdmin= user.roles.includes('ROLE_ADMIN');
 console.log("user role:",this.roles)// Assuming roles is an array and you want the first role
    }
    loadBlackList(): void {
      this.blacklistService.getBlackList().subscribe({
        next: data => {
          console.log('check blacklist:', data);
          this.blacklist = data;
          this.filteredBlacklist = [...this.blacklist];
        },
        error: err => {
          console.error('Error fetching users:', err);
        }
      });
    }
    addToBlackList(newEntry: any): void {
      console.log('Form data before sending to backend:', newEntry); // Log the form data
      this.blacklistService.addToBlackList(newEntry).subscribe({
        next: (data) => {
          console.log('Added to blacklist:', data);
          this.newEntry = {
            senderEmail: '',
            domain: '',
            senderName: '',
            blockDate: new Date()
          };
          this.loadBlackList();
        },
        error: (err) => {
          console.error('Error adding to blacklist:', err);
        }
      });
    }
    
    deleteFromBlackList(id: number): void {
      this.blacklistService.deleteBlackList(id).subscribe({
        next: () => {
          console.log('Deleted from blacklist:', id);
          this.loadBlackList(); // Reload the list after deletion
        },
        error: (err) => {
          console.error('Error deleting from blacklist:', err);
        }
      });
    }
    
    updateBlackList(id: number, updatedEntry: any): void {
      this.blacklistService.updateBlackList(id, updatedEntry).subscribe({
        next: (data) => {
          console.log('Updated blacklist entry:', data);
          this.loadBlackList(); // Reload the list after updating
        },
        error: (err) => {
          console.error('Error updating blacklist entry:', err);
        }
      });
    }
}
