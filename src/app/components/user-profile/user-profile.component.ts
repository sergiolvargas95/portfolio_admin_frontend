import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-profile',
  imports: [ FormsModule ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  user:any = {}

  constructor( private userService: UserService) {}
  
    ngOnInit() {
      this.userService.user$.subscribe((user) => {
        this.user = user;
      });
    }
}
