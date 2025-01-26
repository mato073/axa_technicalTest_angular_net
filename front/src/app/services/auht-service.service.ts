import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuhtService {

  private readonly tokenKey = 'token';
  private apiUrl = 'http://localhost:5000/Auht';

  constructor(private http: HttpClient) { }

  // --- Registration ---
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // --- Login ---
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // --- Logout ---
  logout(): void {
    localStorage.removeItem(this.tokenKey);

  }

  // --- Token Handling ---
  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // --- Check if user is logged in ---
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  refrechToken() {
    const token = this.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/RefreshToken`, { headers }).subscribe((res: any) => {
      const { token } = res
      localStorage.setItem(this.tokenKey, token);
    },
      (err) => {
        console.error("Expired token")
        this.logout();
      }
    )
  }

}
