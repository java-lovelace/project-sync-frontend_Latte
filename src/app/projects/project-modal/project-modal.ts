import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Project} from '../project';
import {FormsModule} from '@angular/forms';
import {ProjectStatus} from '../project-status';

@Component({
  selector: 'app-project-modal',
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

  // Existing project
  formData: Project = {
    id: 0,
    name: '',
    description: '',
    status: ProjectStatus.PENDING,
    responsiblePerson: ''
  };


  // Emit events
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Project>();
  @Output() delete = new EventEmitter<number>();

  ngOnChanges() {
    if (this.project) {
      this.formData = {...this.project};
    } else {
      this.formData = {id: 0, name: '', description: '', status: ProjectStatus.PENDING, responsiblePerson: ''};
    }
  }

  // Emit submit project
  onSubmit() {
    this.save.emit(this.formData);
  }

}
