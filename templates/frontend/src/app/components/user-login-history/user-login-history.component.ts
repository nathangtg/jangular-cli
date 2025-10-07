import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginHistory, UserService } from '../../services/user/user.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-login-history',
  templateUrl: './user-login-history.component.html',
  styleUrls: ['./user-login-history.component.scss'],
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, ReactiveFormsModule, DatePipe]
})
export class UserLoginHistoryComponent implements OnInit {
  @Input() userId!: number;

  loginHistory: UserLoginHistory[] = [];
  loading = true;
  error: string | null = null;

  dateRangeForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // Initialize with last 30 days as default
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    this.dateRangeForm = this.fb.group({
      startDate: [this.formatDate(thirtyDaysAgo)],
      endDate: [this.formatDate(today)]
    });
  }

  ngOnInit(): void {
    this.loadLoginHistory();
  }

  loadLoginHistory(): void {
    const { startDate, endDate } = this.dateRangeForm.value;

    this.loading = true;
    this.userService.getUserLoginHistoryRange(this.userId, startDate, endDate)
      .subscribe({
        next: (data) => {
          this.loginHistory = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading login history', err);
          this.error = 'Failed to load login history. Please try again.';
          this.loading = false;
        }
      });
  }

  onSubmit(): void {
    this.loadLoginHistory();
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
