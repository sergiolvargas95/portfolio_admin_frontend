import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor( private http: HttpClient ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  fetchUser(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${environment.apiUrl}/v1/users/${id}`, { headers });
  }

  setUser(user: any) {
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.getValue();
  }

  updateUser(id: string, user: User, imageFile?: File | null): Observable<any> {
    let headers = this.getAuthHeaders();

    if (headers.has('Content-Type')) {
      headers = headers.delete('Content-Type');
    }

    console.log(user);

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('profesional_degree', user.profesional_degree);
    formData.append('short_description', user.short_description);
    formData.append('long_description', user.long_description);
    formData.append('Content-Type','multipart/form-data');

    if (imageFile) {
      formData.append('image', imageFile, 'image');
    }

    return this.http.post(`${environment.apiUrl}/v1/users/${id}?_method=PUT`, formData, { headers });
  }
}
