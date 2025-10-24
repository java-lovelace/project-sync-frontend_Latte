import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Project} from '../project';
import {FormsModule} from '@angular/forms';
import {ProjectStatus} from '../project-status';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './project-modal.html'
})
export class ProjectModal {

  // Receive project
  @Input() project: Project | null = null;

  // Receive ModalOpen, false by default
  @Input() isModalOpen = false;

  // Project statuses
  projectStatuses = Object.values(ProjectStatus);

  // Existing project
  formData: Project = {
    id: 0,
    name: '',
    description: '',
    status: ProjectStatus.PENDING,
    responsiblePerson: ''
  };

  // Emit events
  @Output() closeModal = new EventEmitter<void>();
  @Output() projectSubmit = new EventEmitter<Project>();
  @Output() delete = new EventEmitter<number>();

  // On changes
  ngOnChanges() {
    if (this.project) {
      this.formData = {...this.project};
    } else {
      this.formData = {id: 0, name: '', description: '', status: ProjectStatus.PENDING, responsiblePerson: ''};
    }
  }

  // Emit submit project
  onSubmit(project: Project) {
    this.projectSubmit.emit(project);
  }

}
