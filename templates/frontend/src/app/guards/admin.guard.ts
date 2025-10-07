import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { RoleName } from '../models/role.model';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.userService.getCurrentUser().pipe(
      map(user => {
        const isAdmin = Array.isArray(user.roles) && user.roles.includes(RoleName.ROLE_ADMIN);
        if (!isAdmin) {
          this.router.navigate(['/unauthorized']);
          return false;
        }

        return true;
      })
    );
  }
}
