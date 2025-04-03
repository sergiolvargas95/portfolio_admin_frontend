import { Component, OnInit } from '@angular/core';
import { ListViewComponent } from "../shared/list-view/list-view.component";
import { ProjectService } from '../../services/projects/project.service';

@Component({
  selector: 'app-projects',
  imports: [ListViewComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor( private projectService: ProjectService ) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getAll().subscribe(resp => {
      this.projects = resp as any[];
      console.log(this.projects);
    });
  }

  deleteProject(id: number) {

  }
}
