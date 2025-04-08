import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { entityConfig } from '../../../config/entity-config';

@Component({
  selector: 'app-form-view',
  imports: [ FormsModule, TitleCasePipe ] ,
  templateUrl: './form-view.component.html',
  styleUrl: './form-view.component.scss'
})
export class FormViewComponent {
  element: any = {};
  fields: string[] = [];
  formTitle = 'Formulario';
  entityName = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.entityName = this.route.snapshot.paramMap.get('entity')!;
    const id = this.route.snapshot.paramMap.get('id');

    const config = entityConfig[this.entityName];

    if (!config) {
      console.error('Entidad no configurada:', this.entityName);
      return;
    }

    this.fields = config.fields;
    this.formTitle = id
      ? `Editar ${config.title}`
      : `Crear ${config.title}`;

    if (id) {
      // Simulación de fetch (ej: usar factoryService.getServiceFor(entity).getById(id))
      console.log(`Cargar datos para ${this.entityName} con ID ${id}`);
    }
  }

  onSubmit() {
    console.log(`${this.formTitle}:`, this.element);
    // Guardar según entidad
  }

}
