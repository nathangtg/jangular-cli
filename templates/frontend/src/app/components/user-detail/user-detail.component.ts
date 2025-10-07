// src/app/modules/user/components/user-detail/user-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../../services/user/user.service';
import { RoleName } from '../../models/role.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],

})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  userId: number = 0;
  loading = true;
  error: string | null = null;
  editMode = false;
  availableRoles = Object.values(RoleName);
  selectedRole: RoleName | null = null;
  passwordChangeMode = false;
  passwordData = { oldPassword: '', newPassword: '', confirmPassword: '' };
  activeTab = 'details';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.loadUserDetails();
    });
  }

  loadUserDetails(): void {
    this.loading = true;
    this.userService.getUserById(this.userId)
      .subscribe({
        next: (data) => {
          this.user = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading user details', err);
          this.error = 'Failed to load user details. Please try again.';
          this.loading = false;
        }
      });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  updateUser(): void {
    if (!this.user) return;

    this.userService.updateUser(this.userId, {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email
    }).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.editMode = false;
      },
      error: (err) => {
        console.error('Error updating user', err);
        this.error = 'Failed to update user. Please try again.';
      }
    });
  }

  addRole(): void {
    if (!this.user || !this.selectedRole) return;

    this.userService.addRoleToUser(this.userId, this.selectedRole)
      .subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          this.selectedRole = null;
        },
        error: (err) => {
          console.error('Error adding role', err);
          this.error = 'Failed to add role. Please try again.';
        }
      });
  }

  removeRole(role: string): void {
    if (!this.user) return;

    this.userService.removeRoleFromUser(this.userId, role)
      .subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
        },
        error: (err) => {
          console.error('Error removing role', err);
          this.error = 'Failed to remove role. Please try again.';
        }
      });
  }

  togglePasswordChangeMode(): void {
    this.passwordChangeMode = !this.passwordChangeMode;
    if (!this.passwordChangeMode) {
      this.passwordData = { oldPassword: '', newPassword: '', confirmPassword: '' };
    }
  }

  changePassword(): void {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.error = 'New password and confirmation do not match';
      return;
    }

    this.userService.changePassword(
      this.userId,
      this.passwordData.oldPassword,
      this.passwordData.newPassword
    ).subscribe({
      next: () => {
        this.passwordChangeMode = false;
        this.passwordData = { oldPassword: '', newPassword: '', confirmPassword: '' };
        alert('Password changed successfully');
      },
      error: (err) => {
        console.error('Error changing password', err);
        this.error = 'Failed to change password. Please verify your old password.';
      }
    });
  }

  changeTab(tab: string): void {
    this.activeTab = tab;
  }

  goBack(): void {
    this.router.navigate(['/admin/users']);
  }
}
