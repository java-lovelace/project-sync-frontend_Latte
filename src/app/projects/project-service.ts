import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Project} from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private _projects: WritableSignal<Project[]> = signal<Project[]>([])

  get projects(): WritableSignal<Project[]> {
    return this._projects;
  }

// Task stats
  private _totalProjects: Signal<number> = computed(() => this._projects().length);

  private _trueProjects: Signal<number> = computed(
    () => this._projects().filter((project) => project.status).length,
  );

  private _falseProjects: Signal<number> = computed(
    () => this._projects().filter((project) => !project.status).length,
  );

  get totalProjects(): Signal<number> {
    return this._totalProjects;
  }

  get trueProjects(): Signal<number> {
    return this._trueProjects;
  }

  get falseProjects(): Signal<number> {
    return this._falseProjects;
  }

  // Add new project
  saveProject(project: Project): void {
    this._projects.update(projects => {
      const exists = projects.some(p => p.id === project.id);

      if (exists) {

        // Update existing project
        return projects.map(p => (p.id === project.id ? project : p));

      } else {

        // Add new project
        const newId = projects.length ? Math.max(...projects.map(p => p.id)) + 1 : 1;
        return [...projects, { ...project, id: newId }];
      }
    });
  }

  // Delete project
  deleteProject(_id: number): void {
    this._projects.update(projects => projects.filter(p => (p.id != _id))
    );
  }
}
