import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-portfolio',
  imports: [ FormsModule ],
  templateUrl: './user-portfolio.component.html',
  styleUrl: './user-portfolio.component.scss'
})
export class UserPortfolioComponent {
  user:any = {}
  errorMessage = '';

  selectedCV: File | null = null;

  constructor( 
      private userService: UserService,
      private authService: AuthService
    ) {}

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  onFileSelected() {

  }
  
  onSubmit() {
      const id = this.authService.getUserId();
      console.log(this.user);
      if(id) {
        this.userService.updateUser(id, this.user).subscribe({
          next: (response) => {
            this.userService.setUser(response.user);
            Swal.fire({
              icon: 'success',
              title: 'Updated profile',
              text: 'Your information has been saved successfully.',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Accept'
            });
          },
          error: () => {
            this.errorMessage = 'An error ocurred to update';
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'The profile could not be updated.',
              confirmButtonColor: '#d33',
              confirmButtonText: 'Cerrar'
            });
          }
        });
      }
    }
}
