import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProjectCard} from '../project-card/project-card';
import {Project} from '../project';

@Component({
  selector: 'app-project-list',
  imports: [
    ProjectCard
  ],
  templateUrl: './project-list.html'
})
export class ProjectList {

  // Receive projects
  @Input() projects!: Project[];

  // Edit project event
  @Output() editClicked = new EventEmitter<Project>();

}
