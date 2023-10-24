import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7263/api/account';

  constructor(private http: HttpClient) { }



  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    const url = `${this.apiUrl}/login`;
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, loginData, { headers: headers });
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
