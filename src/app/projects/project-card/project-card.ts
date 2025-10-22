import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Project} from '../project';
import {NgClass} from '@angular/common';
import {ProjectModal} from '../project-modal/project-modal';

@Component({
  selector: 'app-project-card',
  imports: [
    NgClass
  ],
  templateUrl: './project-card.html'
})
export class ProjectCard {

  // Parameter project
  @Input() project!: Project;

  // Edit project event
  @Output() editClicked = new EventEmitter<Project>();

}

