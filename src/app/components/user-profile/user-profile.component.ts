import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  imports: [ FormsModule ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  user:any = {}
  errorMessage = '';
  imageFile: File | null = null;
  imagePreview: string | null = null;

  constructor( 
    private userService: UserService,
    private authService: AuthService
  ) {}
  
    ngOnInit() {
      this.userService.user$.subscribe((user) => {
        this.user = user;
      });
    }

    onSubmit() {
      const id = this.authService.getUserId();
      if(id) {
        this.userService.updateUser(id, this.user, this.imageFile).subscribe({
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

    onPhotoSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        this.imageFile = input.files[0];
    
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(this.imageFile);
      }
    }
}
