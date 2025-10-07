import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserRoutes } from './user.route';
import { UserDetailComponent } from '../../components/user-detail/user-detail.component';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UserLoginHistoryComponent } from "../../components/user-login-history/user-login-history.component";
import { FormsModule } from '@angular/forms';
import { UserActiveSessionsComponent } from "../../components/user-active-sessions/user-active-sessions.component";

@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    CommonModule,
    UserListComponent,
    RouterModule.forChild(UserRoutes)
    ,
    UserLoginHistoryComponent,
    FormsModule,
    UserActiveSessionsComponent
  ]
})
export class UserModule { }
