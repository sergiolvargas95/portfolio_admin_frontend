import { Component, OnInit } from '@angular/core';
import { ListViewComponent } from "../shared/list-view/list-view.component";
import { ProjectService } from '../../services/projects/project.service';

@Component({
  selector: 'app-projects',
  imports: [ListViewComponent ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  currentPage: number = 1;
  lastPage: number = 1;
  selectedProject: any = null;
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
    this.selectedProject = { ...project }; // Clonas el objeto para evitar mutaciones directas
  }

  updateProject(updatedProject: any) {
    console.log('Proyecto actualizado:', updatedProject);
  
    // Aquí iría tu lógica para actualizar el proyecto,
    // como una llamada al servicio:
  
    //this.projectService.update(updatedProject.id, updatedProject).subscribe(() => {
      // Lógica para recargar proyectos, mostrar mensaje, etc.
      this.loadProjects(); // suponiendo que tengas un método para recargar la lista
      this.selectedProject = null; // oculta el formulario
    //});
  }
}
