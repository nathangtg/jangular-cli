import { Routes } from '@angular/router';
import { AdminGuard } from '../../guards/admin.guard';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UserDetailComponent } from '../../components/user-detail/user-detail.component';

export const UserRoutes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: UserListComponent
      },
      {
        path: ':id',
        component: UserDetailComponent
      },
      {
        path: ':id/edit',
        component: UserDetailComponent
      }
    ]
  }
];
