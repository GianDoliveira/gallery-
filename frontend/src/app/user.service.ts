import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<{ message: string; token?: string }> {
    return this.http.post<{ message: string; token?: string }>(`${this.apiUrl}/login`, credentials);
  }

  register(user: { username: string; email: string; password: string }): Observable<{ message: string; token?: string }> {
    return this.http.post<{ message: string; token?: string }>(`${this.apiUrl}/register`, user);
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
