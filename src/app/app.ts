import {Component, signal} from '@angular/core';
import {ProjectList} from './projects/project-list/project-list';
import {ProjectFilter} from './projects/project-filter/project-filter';
import {ProjectService} from './projects/project-service';
import {ProjectHeader} from './projects/project-header/project-header';
import {Project} from './projects/project';
import {ProjectModal} from "./projects/project-modal/project-modal";

@Component({
  selector: 'app-root',
  imports: [ProjectList, ProjectFilter, ProjectHeader, ProjectModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isModalOpen = signal<boolean>(false);
  selectedProject = signal<Project | null>(null);

  constructor(private projectService: ProjectService) {}

  onAddProjectClicked(): void {
    this.selectedProject.set(null);
    this.isModalOpen.set(true);
  }

  onEditProjectClicked(project: Project): void {
    this.selectedProject.set(project);
    this.isModalOpen.set(true);
  }

  onProjectSave(project: Project): void {
    if (project.id) {
      this.projectService.updateProject(project);
    } else {
      this.projectService.createProject(project);
    }
    this.isModalOpen.set(false);
    this.selectedProject.set(null);
  }

  onModalClose(): void {
    this.isModalOpen.set(false);
    this.selectedProject.set(null);
  }
}
