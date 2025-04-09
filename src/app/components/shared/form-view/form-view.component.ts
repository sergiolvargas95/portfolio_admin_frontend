import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { entityConfig } from '../../../config/entity-config';
import { FactoryService } from '../../../services/factory/factory.service';

@Component({
  selector: 'app-form-view',
  imports: [ FormsModule, TitleCasePipe, LowerCasePipe ] ,
  templateUrl: './form-view.component.html',
  styleUrl: './form-view.component.scss'
})
export class FormViewComponent {
  element: any = {};
  fields: string[] = [];
  formTitle = 'Form';
  entityName = '';
  imageFile: File | null = null;
  imagePreview: string | null = null;
  existingImageUrl: string | null = null;

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
        this.existingImageUrl = resp.image;
      });
    }
  }

  onSubmit() {
    console.log(`${this.formTitle}:`, this.element);
    // Guardar según entidad
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imageFile = input.files[0];
  
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

}
