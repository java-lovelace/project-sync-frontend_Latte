import {Component, effect, inject, signal, OnInit} from '@angular/core';
import {ProjectCard} from '../project-card/project-card';
import {Project} from '../project';
import {ProjectService} from '../project-service';
import {ProjectModal} from '../project-modal/project-modal';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    ProjectCard,
    ProjectModal
  ],
  templateUrl: './project-list.html'
})
export class ProjectList implements OnInit {

  // Inject the service
  private projectService = inject(ProjectService);

  // Get the data from the service
  projects = this.projectService.projects;
  loading = this.projectService.loading;

  // Modal properties
  showModal: boolean = false;
  showMessageModal: boolean = false;
  modalMessage: string = '';
  modalType: 'success' | 'error' = 'success';
  selectedProject = signal<Project | null>(null);

  // Constructor
  constructor() {

    // Effect for error messages
    effect(() => {
      const error = this.projectService.error();
      if (error) {
        this.showMessage(error, 'error');
      }
    });

    // Effect for success messages
    effect(() => {
      const success = this.projectService.success();
      if (success) {
        this.showMessage(success, 'success');
      }
    });
  }

  // Load tasks on init
  ngOnInit(): void {
    this.projectService.loadProjects();
  }

  // Method to show the modal (message modal)
  showMessage(message: string, type: 'success' | 'error') {
    this.modalMessage = message;
    this.modalType = type;
    this.showMessageModal = true;
  }

  // Method to close the project form modal
  closeModal() {
    this.showModal = false;
    this.modalMessage = '';
    this.selectedProject.set(null);
  }

  // Close the message modal
  closeMessage() {
    this.showMessageModal = false;
    this.modalMessage = '';
    this.projectService.clearMessages();
  }

  // Handle edit project
  onEditProject(project: Project): void {
    this.selectedProject.set(project);
    this.showModal = true;
  }

  // Handle delete project from modal
  onDeleteProject(id: number): void {

    // Call the service to delete
    this.projectService.deleteProject(id);

    // Close the project modal
    this.closeModal();
  }

  // Handle project form submit
  onProjectFormSubmit(project: Project): void {

    // Submit the project to the service
    if (project) {
      this.projectService.updateProject(project);
    } else {
      this.projectService.createProject(project);
    }

    // Close the modal after submission
    this.closeModal();
  }
}
