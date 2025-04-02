import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [ RouterModule, CommonModule ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  user = {
    name: localStorage.getItem('name'),
    lastNamme: localStorage.getItem('lastName'),
    imgUrl: localStorage.getItem('profilePicture')
  };

  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
    {
      routerLink: 'home',
      icon: 'icons/icon-home.png',
      label: 'Home'
    },
    {
      routeLink: 'projects',
      icon: 'icons/icon-calender.png',
      label: 'My Projects',
    },
    {
      routeLink: 'technologies',
      icon: 'icons/icon-tasks.png',
      label: 'My Technologies',
    },
    {
      routeLink: 'experience',
      icon: 'icons/icon-categories.png',
      label: 'My Experiences',
    },
    {
      routeLink: 'settings',
      icon: 'icons/icon-settings.png',
      label: 'Settings',
    },
  ];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
