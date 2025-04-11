import { Component, OnInit } from '@angular/core';
import { ListViewComponent } from "../shared/list-view/list-view.component";
import { ProjectService } from '../../services/projects/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  imports: [ListViewComponent ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  currentPage: number = 1;
  lastPage: number = 1;
  selectedProject: Project|null = null;
  totalElements: number = 0;
  totalElementsPerPage: number = 0;
  initialElementsPerPage: number = 0;
  constructor( private projectService: ProjectService ) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getAll().subscribe((resp:any) => {
      this.projects = resp.data;
      this.currentPage = resp.current_page;
      this.lastPage = resp.last_page;
      this.totalElements = resp.total;
      this.totalElementsPerPage = resp.to;
      this.initialElementsPerPage = resp.from;
    });
  }

  onEditProject(project: any) {
    this.selectedProject = { ...project }; 
  }
}
