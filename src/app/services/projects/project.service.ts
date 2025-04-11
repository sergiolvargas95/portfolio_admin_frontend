import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';

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

  update(id: string, project: any, imageFile?: File) {
    let headers = this.getAuthHeaders();

    if (headers.has('Content-Type')) {
      headers = headers.delete('Content-Type');
    }
    
    const formData = new FormData();
    formData.append('title', project.title);
    formData.append('description', project.description);
    formData.append('repository_url', project.repository_url);
    formData.append('demo_url', project.demo_url);
    formData.append('Content-Type','multipart/form-data');

    if (imageFile) {
      formData.append('image', imageFile, 'image');
    }
  
    return this.http.post(`${environment.apiUrl}/v1/projects/${id}?_method=PUT`, formData, {
      headers
    });
  }
}
