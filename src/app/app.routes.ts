import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ProjectsComponent } from './components/projects/projects.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [ authGuard ]  },
    { path: 'projects', component: ProjectsComponent, canActivate: [ authGuard ]},
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];
