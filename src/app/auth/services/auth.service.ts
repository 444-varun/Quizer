import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080'; // adjust if needed

  constructor(private http: HttpClient, private route:Router) {}

  login(username: string, password: string): Observable<{ jwt: string }> {
    return this.http.post<{ jwt: string }>(`${this.baseUrl}/authenticate`, {
      username,
      password
    });
  }

  register(data: RegisterRequest): Observable<any> {
  return this.http.post(`${this.baseUrl}/api/users/register`, data);
}


  storeToken(token: string): void {
    localStorage.setItem('quizer-token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('quizer-token');
  }

  clearToken(): any {
    localStorage.removeItem('quizer-token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isLogout(){
  this.clearToken();
  this.route.navigate(['/auth/login'])
  }
}
