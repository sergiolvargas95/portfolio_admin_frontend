import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ProjectsComponent } from './components/projects/projects.component';
import { TechnologiesComponent } from './components/technologies/technologies.component';
import { FormViewComponent } from './components/shared/form-view/form-view.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserSecurityComponent } from './components/user-security/user-security.component';
import { UserPortfolioComponent } from './components/user-portfolio/user-portfolio.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [ authGuard ]  },
    { path: 'projects', component: ProjectsComponent, canActivate: [ authGuard ]},
    { path: 'form/:entity/create', component: FormViewComponent, canActivate: [ authGuard ] },
    { path: 'form/:entity/edit/:id', component: FormViewComponent, canActivate: [ authGuard ] },
    { path: 'technologies', component: TechnologiesComponent, canActivate: [ authGuard ]},
    {
        path: 'profile',
        component: ProfileComponent,
        children: [
          { path: 'user-profile', component: UserProfileComponent },
          { path: 'user-portfolio', component: UserPortfolioComponent },
          { path: 'user-security', component: UserSecurityComponent },
          { path: '', redirectTo: 'user-profile', pathMatch: 'full' } // opción por defecto
        ]
      },
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];
