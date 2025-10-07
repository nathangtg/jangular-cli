import { Component, Input, OnInit } from '@angular/core';
import { UserLoginHistory, UserService } from '../../services/user/user.service';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-user-active-sessions',
  templateUrl: './user-active-sessions.component.html',
  styleUrls: ['./user-active-sessions.component.scss'],
  standalone: true,
  imports: [DatePipe, NgIf, NgFor]
})
export class UserActiveSessionsComponent implements OnInit {
  @Input() userId!: number;

  activeSessions: UserLoginHistory[] = [];
  loading = true;
  error: string | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadActiveSessions();
  }

  loadActiveSessions(): void {
    this.loading = true;
    this.userService.getActiveSessions(this.userId)
      .subscribe({
        next: (data) => {
          this.activeSessions = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading active sessions', err);
          this.error = 'Failed to load active sessions. Please try again.';
          this.loading = false;
        }
      });
  }
}
