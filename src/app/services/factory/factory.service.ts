import { Injectable } from '@angular/core';
import { ProjectService } from '../projects/project.service';
import { TechnologyService } from '../technologies/technology.service';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor( 
    private projectService: ProjectService,
    private technologyService: TechnologyService
  ) { }

  getServiceFor(entity: string): any {
    switch(entity) {
      case 'projects':
        return this.projectService;
      case 'technologies':
        return this.technologyService;
      default:
        throw new Error(`No service found for entity: ${entity}`);
    }
  }
}
