import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-portfolio',
  imports: [ FormsModule ],
  templateUrl: './user-portfolio.component.html',
  styleUrl: './user-portfolio.component.scss'
})
export class UserPortfolioComponent {
  user:any = {}
  portfolio: any = {
    professional_profile: '',
    short_description: '',
    long_description: ''
  };

  selectedCV: File | null = null;

  constructor( private userService: UserService) {}

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }
  

onFileSelected(event: any) {
  this.selectedCV = event.target.files[0];
}

savePortfolio() {
  // Aquí puedes manejar la lógica para enviar el formulario junto al archivo si lo deseas
  console.log(this.portfolio, this.selectedCV);
}
}
