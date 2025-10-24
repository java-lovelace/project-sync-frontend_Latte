import {Component, effect, EventEmitter, inject, Input, Output} from '@angular/core';
import {ProjectCard} from '../project-card/project-card';
import {Project} from '../project';
import {ProjectService} from '../project-service';
import {ProjectModal} from '../project-modal/project-modal';

@Component({
  selector: 'app-project-list',
  imports: [
    ProjectCard,
    ProjectModal
  ],
  templateUrl: './project-list.html'
})
export class ProjectList {

  // Inject the service
  private projectService = inject(ProjectService);

  // Get the data from the service
  projects = this.projectService.projects;
  loading = this.projectService.loading;

  // Modal properties
  showModal: boolean = false;
  modalMessage: string = '';
  modalType: 'success' | 'error' = 'success';

  constructor() {
    effect(() => {
      const error = this.projectService.error();
      if (error) {
        this.showMessage(error, 'error');
      }
    });

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

  // Method to show the modal
  showMessage(message: string, type: 'success' | 'error') {
    this.modalMessage = message;
    this.modalType = type;
    this.showModal = true;
  }

  // Method to close the modal
  closeModal() {
    this.showModal = false;
    this.modalMessage = '';
    this.projectService.clearMessages();
  }

}
