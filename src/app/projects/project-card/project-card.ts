import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Project} from '../project';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './project-card.html'
})
export class ProjectCard implements OnInit {

  // Parameter project
  @Input() project!: Project;

  // Emit event
  @Output() editProject = new EventEmitter<Project>();

  // Emit edit project event
  onEditProject(): void {
    this.editProject.emit(this.project);
  }

  // On init
  ngOnInit(): void {
    console.log('ProjectCard received project:', this.project);
  }
}
