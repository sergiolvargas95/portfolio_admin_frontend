import { Component, EventEmitter, Input, Output, signal, Signal } from '@angular/core';

@Component({
  selector: 'app-list-view',
  imports: [],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent {
  @Input() title: string = '';
  @Input() elements: any[] = [];
  @Input() displayFields: string[] = [];
  
  @Output() deleteElement = new EventEmitter<number>();

  openDropdown = signal<number | null>(null);

  toggleDropdown(index: number) {
    this.openDropdown.update((current) => current === index ? null : index);
  }

  viewDetails(element: any) {
    // Implementar lógica para ver detalles (modal, navegación, etc.)
  }

  editElement(element: any) {
    // Implementar lógica para editar el elemento
  }
}
