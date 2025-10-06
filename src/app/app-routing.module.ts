import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserSetupComponent } from './board-user-setup/board-user-setup.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardBlacklistComponent } from './board-blacklist/board-blacklist.component';
import { EmailsComponent } from './board-email/board-email.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'blacklist', component: BoardBlacklistComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'emails', component: EmailsComponent },
  { path: 'user-setup', component: UserSetupComponent },


  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
