import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  activeTab = 'profile';
  user: any = {};

  constructor( 
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.authService.getUserId();
    if (id) {
      this.userService.fetchUser(id).subscribe((user) => {
        this.userService.setUser(user);
      });
    } else {
      console.error('Could not get user ID');
    }
  }
}
