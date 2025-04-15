import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { User } from '../../models/user.model';
import { map } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = signal<boolean>(false);

  constructor( private http: HttpClient) { 
    this.checkToken();
  }

  login(user: User) {
    const authData = {
      email: user.email,
      password: user.password
    };

    return this.http.post(`${environment.apiUrl}/login`, authData, { observe: 'response' }).pipe(
      map(resp => {
        const token = resp.headers.get('Authorization');
        if (token) {
          this.saveToken(token);
          this.loggedIn.set(true);
        }

        const user = JSON.parse(JSON.stringify(resp.body));
        this.saveUser(user.user);

        return resp.body;
      })
    );
  }

  private saveToken( token: string ) {
    const cleanToken = token.replace(/^Bearer\s*/, ''); 
    localStorage.setItem('token', cleanToken);
  }

  private saveUser( user: User ) {
    localStorage.setItem('id', user.id);
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
    localStorage.setItem('profilePicture', user.profilePicture);
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.set(false);
  }

  isAuthenticated(): boolean {
    return this.loggedIn();
  }

  private checkToken() {
    const token = localStorage.getItem('auth_token');
    this.loggedIn.set(!!token);
  }
}
