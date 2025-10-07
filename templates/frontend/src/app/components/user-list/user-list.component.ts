import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from '../../services/user/user.service';
import { NgClass, NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers()
      .subscribe({
        next: (data) => {
          this.users = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading users', err);
          this.error = 'Failed to load users. Please try again.';
          this.loading = false;
        }
      });
  }

  viewUserDetails(userId: number): void {
    this.router.navigate(['/admin/users', userId]);
  }

  editUser(userId: number, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/admin/users', userId, 'edit']);
  }

  deleteUser(userId: number, event: Event): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      this.userService.deleteUser(userId)
        .subscribe({
          next: () => {
            this.users = this.users.filter(user => user.id !== userId);
          },
          error: (err) => {
            console.error('Error deleting user', err);
            this.error = 'Failed to delete user. Please try again.';
          }
        });
    }
  }
}
