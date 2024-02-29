import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  router: any;
  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post('http://localhost:3006/register', data);
  }
  login(data: any) {
    return this.http.post('http://localhost:3006/login', data).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
    });
  }
  getProtectedData() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:3006/protected-data', { headers });
  }
  
  isLoggedIn = false;
  redirectUrl: string | null = null;
  loginOn(): Observable<any> {
    return of(true).pipe(
      delay(1000),
      tap(() => (this.isLoggedIn = true))
    );
  }
  logout(): void {
    this.isLoggedIn = false;
  }
}