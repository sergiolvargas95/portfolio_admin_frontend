import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor( private http: HttpClient ) { }

  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  
  getAll(page: number = 1): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${environment.apiUrl}/v1/projects?page=${page}`, { headers });
  }

  getById(id: string) {
    const headers = this.getAuthHeaders();
    return this.http.get(`${environment.apiUrl}/v1/projects/${id}`, { headers });
  }
}
