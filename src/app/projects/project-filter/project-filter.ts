import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-project-filter',
  imports: [],
  templateUrl: './project-filter.html'
})
export class ProjectFilter {

  // Receive stats
  @Input() totalProjects!: number;
  @Input() trueProjects!: number;
  @Input() falseProjects!: number;

}
