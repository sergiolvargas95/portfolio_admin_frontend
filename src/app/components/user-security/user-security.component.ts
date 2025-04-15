import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-security',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './user-security.component.html',
  styleUrl: './user-security.component.scss'
})
export class UserSecurityComponent {
  user:any = {}
  passwords = {
    current: '',
    new: '',
    confirm: ''
  };

  constructor( private userService: UserService) {}

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  updatePassword() {
    if (this.passwords.new !== this.passwords.confirm) {
      console.error("Las contraseñas no coinciden");
      return;
    }
  
    const payload = {
      currentPassword: this.passwords.current,
      newPassword: this.passwords.new
    };
  
    // Aquí llamas al servicio para actualizar la contraseña
    // this.securityService.updatePassword(payload).subscribe(
    //   res => {
    //     console.log('Contraseña actualizada con éxito');
    //   },
    //   err => {
    //     console.error('Error al actualizar la contraseña', err);
    //   }
    // );
  }
}
