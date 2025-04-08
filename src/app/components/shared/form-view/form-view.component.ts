import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { entityConfig } from '../../../config/entity-config';
import { FactoryService } from '../../../services/factory/factory.service';

@Component({
  selector: 'app-form-view',
  imports: [ FormsModule, TitleCasePipe ] ,
  templateUrl: './form-view.component.html',
  styleUrl: './form-view.component.scss'
})
export class FormViewComponent {
  element: any = {};
  fields: string[] = [];
  formTitle = 'Form';
  entityName = '';

  constructor(
    private route: ActivatedRoute,
    private factoryService: FactoryService
  ) {}

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
      ? `Edit ${config.title}`
      : `Create ${config.title}`;

    if (id) {
      const service = this.factoryService.getServiceFor(this.entityName);
      service.getById(id).subscribe((resp:any) =>{
        this.element = resp;
      });
    }
  }

  onSubmit() {
    console.log(`${this.formTitle}:`, this.element);
    // Guardar según entidad
  }

}
