import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  roles: string[];
  active: boolean;
}

export interface UserLoginHistory {
  id: number;
  userId: number;
  loginTime: string;
  logoutTime: string;
  ipAddress: string;
  userAgent: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  /**
   * Get current user profile
   */
  getCurrentUser(): Observable<User> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<User>(`${this.apiUrl}/api/users/me`, { headers });
  }

  /**
   * Get all users (admin only)
   */
  getAllUsers(): Observable<User[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<User[]>(`${this.apiUrl}/api/users`, { headers });
  }

  /**
   * Get user by ID (admin only)
   * @param userId User ID
   */
  getUserById(userId: number): Observable<User> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<User>(`${this.apiUrl}/api/users/${userId}`, { headers });
  }

  /**
   * Update user information
   * @param userId User ID
   * @param userData User data to update
   */
  updateUser(userId: number, userData: Partial<User>): Observable<User> {
    const headers = this.authService.getAuthHeaders();
    return this.http.put<User>(`${this.apiUrl}/api/users/${userId}`, userData, { headers });
  }

  /**
   * Change user password
   * @param userId User ID
   * @param oldPassword Current password
   * @param newPassword New password
   */
  changePassword(userId: number, oldPassword: string, newPassword: string): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    const data = {
      oldPassword,
      newPassword
    };
    return this.http.post<void>(`${this.apiUrl}/api/users/${userId}/change-password`, data, { headers });
  }

  /**
   * Delete user (soft delete, admin only)
   * @param userId User ID
   */
  deleteUser(userId: number): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/api/users/${userId}`, { headers });
  }

  /**
   * Add role to user (admin only)
   * @param userId User ID
   * @param roleName Role to add
   */
  addRoleToUser(userId: number, roleName: string): Observable<User> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<User>(`${this.apiUrl}/api/users/${userId}/roles`, { roleName }, { headers });
  }

  /**
   * Remove role from user (admin only)
   * @param userId User ID
   * @param roleName Role to remove
   */
  removeRoleFromUser(userId: number, roleName: string): Observable<User> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<User>(`${this.apiUrl}/api/users/${userId}/roles/${roleName}`, { headers });
  }

  /**
   * Get user login history
   * @param userId User ID
   */
  getUserLoginHistory(userId: number): Observable<UserLoginHistory[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<UserLoginHistory[]>(`${this.apiUrl}/api/users/${userId}/login-history`, { headers });
  }

  /**
   * Get user login history for a specific date range
   * @param userId User ID
   * @param startDate Start date in ISO format (YYYY-MM-DD)
   * @param endDate End date in ISO format (YYYY-MM-DD, optional)
   */
  getUserLoginHistoryRange(userId: number, startDate: string, endDate?: string): Observable<UserLoginHistory[]> {
    const headers = this.authService.getAuthHeaders();
    let url = `${this.apiUrl}/api/users/${userId}/login-history/range?startDate=${startDate}`;

    if (endDate) {
      url += `&endDate=${endDate}`;
    }

    return this.http.get<UserLoginHistory[]>(url, { headers });
  }

  /**
   * Get active sessions for a user
   * @param userId User ID
   */
  getActiveSessions(userId: number): Observable<UserLoginHistory[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<UserLoginHistory[]>(`${this.apiUrl}/api/users/${userId}/active-sessions`, { headers });
  }
}
