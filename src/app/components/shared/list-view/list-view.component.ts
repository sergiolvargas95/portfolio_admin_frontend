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
  @Input() currentPage: number = 0;
  @Input() lastPage: number = 0;
  @Input() totalElements: number = 0;
  @Input() totalElementsPerPage: number = 0;
  @Input() initialElementsPerPage: number = 0;
  @Output() deleteElement = new EventEmitter<number>();
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();


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

  changePage(page: number) {
    if (page >= 1 && page <= this.lastPage) {
      this.pageChange.emit(page);
    }
  }
}
