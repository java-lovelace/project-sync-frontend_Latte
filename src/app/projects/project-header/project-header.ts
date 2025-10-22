import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-project-header',
  imports: [
  ],
  templateUrl: './project-header.html'
})
export class ProjectHeader {

  // Add project event
  @Output() addClicked = new EventEmitter<void>();

}
