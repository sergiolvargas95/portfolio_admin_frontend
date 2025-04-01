import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  user: User;
  userToken?: string;

  constructor(
    private fb:FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.createLoginForm();
    this.user = new User();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    if(this.loginForm.invalid) { return; }

    this.user.email = this.loginForm.get('email')?.value;
    this.user.password = this.loginForm.get('password')?.value;

   this.auth.login(this.user).subscribe( resp => {
     this.router.navigateByUrl('/home');
    });
  }

  get invalidEmail() {
    return this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched;
  }

  get invalidPassword() {
    return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched;
  }

  readToken() {
    if(localStorage.getItem('token')) {
      this.userToken = JSON.parse(localStorage.getItem('token') as string);
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }
}
