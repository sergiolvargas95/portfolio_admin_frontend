import { Component, EventEmitter, Input, Output, signal, Signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-view',
  imports: [ TitleCasePipe ],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent {
  @Input() title: string = '';
  @Input() elements: any[] = [];
  @Input() displayFields: string[] = [];
  @Output() deleteElement = new EventEmitter<number>();

  openDropdown = signal<number | null>(null);

  constructor( private router: Router) {

  }

  toggleDropdown(index: number) {
    this.openDropdown.update((current) => current === index ? null : index);
  }

  viewDetails(element: any) {
    // Implementar lógica para ver detalles (modal, navegación, etc.)
  }

  editElement(project: any) {
    this.router.navigate(['/form', 'projects', 'edit', project.id]);

  }
}
