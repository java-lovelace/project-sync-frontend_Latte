import {Component, EventEmitter, inject, Input, Output, OnInit} from '@angular/core';
import {Project} from '../project';
import {NgClass} from '@angular/common';
import {ProjectModal} from '../project-modal/project-modal';
import {ProjectService} from '../project-service';
import {ProjectStatus} from '../project-status';

@Component({
  selector: 'app-project-card',
  imports: [
    NgClass
  ],
  templateUrl: './project-card.html'
})
export class ProjectCard implements OnInit {

  // Inject the service
  private projectService = inject(ProjectService);

  // Parameter project
  @Input() project!: Project;

  protected readonly ProjectStatus = ProjectStatus;

  ngOnInit(): void {
    console.log('ProjectCard received project:', this.project);
  }
}
