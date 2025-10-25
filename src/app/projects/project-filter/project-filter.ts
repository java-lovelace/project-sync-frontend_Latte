import {Component, inject} from '@angular/core';
import {ProjectService} from '../project-service';

@Component({
  selector: 'app-project-filter',
  imports: [],
  templateUrl: './project-filter.html'
})
export class ProjectFilter {

  // Inject the service
  private projectService = inject(ProjectService);

  // Expose total projects and current search
  totalProjects = this.projectService.totalProjects;
  search = this.projectService.search;

  // Handle input change — allow only digits for id search and pass numeric id or null
  onSearchChange(value: string) {
    const sanitized = (value ?? '').toString().replace(/\D+/g, '');
    if (sanitized === '') {
      this.projectService.setSearch(null);
      return;
    }

    const id = Number(sanitized);
    if (!Number.isNaN(id)) {
      this.projectService.setSearch(Math.trunc(id));
    } else {
      this.projectService.setSearch(null);
    }
  }

}
