import { Component } from '@angular/core';
import { TechnologyService } from '../../services/technologies/technology.service';
import { ListViewComponent } from '../shared/list-view/list-view.component';

@Component({
  selector: 'app-technologies',
  imports: [ ListViewComponent ],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.scss'
})
export class TechnologiesComponent {
  technologies: any[] = [];
  constructor( private technologyService: TechnologyService ) { }

  ngOnInit() {
    this.loadTechnologies();
  }

  loadTechnologies() {
    this.technologyService.getAll().subscribe(resp => {
      this.technologies = resp as any[];
    })
  }
}
