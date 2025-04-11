  import { LowerCasePipe, TitleCasePipe } from '@angular/common';
  import { Component, OnInit } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { entityConfig } from '../../../config/entity-config';
  import { FactoryService } from '../../../services/factory/factory.service';
  import { environment } from '../../../environments/environments';
  import Swal from 'sweetalert2';

  @Component({
    selector: 'app-form-view',
    imports: [ FormsModule, TitleCasePipe, LowerCasePipe ] ,
    templateUrl: './form-view.component.html',
    styleUrl: './form-view.component.scss'
  })
  export class FormViewComponent implements OnInit {
    element: any = {};
    fields: string[] = [];
    formTitle = 'Form';
    entityName = '';
    imageFile: File | null = null;
    imagePreview: string | null = null;
    existingImageUrl: string | null = null;
    id: string | null = '';

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private factoryService: FactoryService
    ) {}

    ngOnInit() {
      this.entityName = this.route.snapshot.paramMap.get('entity')!;
      this.id = this.route.snapshot.paramMap.get('id');

      const config = entityConfig[this.entityName];

      if (!config) {
        console.error('Entidad no configurada:', this.entityName);
        return;
      }

      this.fields = config.fields;
      this.formTitle = this.id
        ? `Edit ${config.title}`
        : `Create ${config.title}`;

      if (this.id) {
        const service = this.factoryService.getServiceFor(this.entityName);
        service.getById(this.id).subscribe((resp:any) =>{
          this.element = resp;
          this.existingImageUrl = resp.image;
        });
      }
    }

    onSubmit() {
      const service = this.factoryService.getServiceFor(this.entityName);

    if (!service) {
      console.error('No service found for:', this.entityName);
      return;
    }

    if (this.id) {
      service.update(this.id, this.element, this.imageFile).subscribe({
        next: () => {
          Swal.fire('Updated', `${this.entityName} successfully updated`, 'success');
          this.router.navigateByUrl(`/${this.entityName}`);
        },
        error: (err:any) => {
          Swal.fire('Error', 'The item could not be updated.', 'error');
          console.error(err);
        }
      });
    } else {
      service.create(this.element).subscribe({
        next: () => {
          Swal.fire('Creado', `${this.entityName} creado con éxito`, 'success');
          this.router.navigateByUrl(`/${this.entityName}`);
        },
        error: (err:any) => {
          Swal.fire('Error', 'The item could not be created', 'error');
          console.error(err);
        }
      });
    }
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

    getImageUrl(): string | null {
      if (!this.existingImageUrl) return null;
    
      if (this.existingImageUrl.startsWith('http')) {
        return this.existingImageUrl;
      }
      
      console.log(`${environment.apiImage}/storage/${this.existingImageUrl}`);
      return `${environment.apiImage}/storage/${this.existingImageUrl}`;
    }
  }
