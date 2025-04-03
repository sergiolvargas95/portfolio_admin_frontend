import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor( private http: HttpClient ) { }

  

  getAll() {
    const headers = this.getAuthHeaders();
    return this.http.get(`${environment.apiUrl}/v1/projects`, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
