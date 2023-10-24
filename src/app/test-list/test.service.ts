import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnswerSubmitDTO } from '../test-detail/Interfaces/answerdto';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'https://localhost:7263/api';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getTests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/test?attribute=name&order=asc&page=1&pageSize=10`);
  }
  getTest(testId: number): Observable<any> {
    let token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/test/${testId}`, {headers: headers});
  }

  submitAnswers(testId: number, answers: number[]): Observable<any> {
    let token = this.auth.getToken();
    
    const url = `${this.apiUrl}/test/${testId}/submit`;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    
    const textArray = answers.map(id => ({id: id}));
    const jsonIdObjects = JSON.stringify(textArray);

    return this.http.post(url, jsonIdObjects, { headers: headers });
  }
}
