import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  constructor( private http:HttpClient ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAll() {
    const headers = this.getAuthHeaders();
    return this.http.get(`${environment.apiUrl}/v1/technologies`, { headers });
  }

  getById(id: string) {
    const headers = this.getAuthHeaders();
    return this.http.get(`${environment.apiUrl}/v1/technologies/${id}`, { headers });
  }

  update(id: string, technology: any, imageFile?: File) {
    let headers = this.getAuthHeaders();

    if (headers.has('Content-Type')) {
      headers = headers.delete('Content-Type');
    }
    
    const formData = new FormData();
    formData.append('title', technology.title);
    formData.append('Content-Type','multipart/form-data');

    if (imageFile) {
      formData.append('image', imageFile, 'image');
    }
  
    return this.http.post(`${environment.apiUrl}/v1/technologies/${id}?_method=PUT`, formData, {
      headers
    });
  }

}
