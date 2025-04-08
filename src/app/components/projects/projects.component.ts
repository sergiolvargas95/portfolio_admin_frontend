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
  selectedProject: any = null;

  constructor( private projectService: ProjectService ) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getAll().subscribe((resp:any) => {
      this.projects = resp;
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
