import {computed, Injectable, Signal, signal} from '@angular/core';
import {Project} from './project';
import {HttpClient} from '@angular/common/http';
import {catchError, finalize, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  // Define apiUrl
  private apiUrl = 'http://localhost:8080';

  // Define signals
  private _projects = signal<Project[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);
  private _success = signal<string | null>(null);
  private _totalProjects: Signal<number> = computed(() => this._projects().length);

  // Getters for each signal as readonly
  public projects = this._projects.asReadonly();
  public loading = this._loading.asReadonly();
  public error = this._error.asReadonly();
  public success = this._success.asReadonly();

  get totalProjects(): Signal<number> {
    return this._totalProjects;
  }


// Constructor to inject HttpClient
  constructor(private http: HttpClient) {
  }

  // Method to load projects from the API
  loadProjects(): void {
    this._loading.set(true);
    this._error.set(null);
    this._success.set(null);

    this.http
      .get<Project[]>(`${this.apiUrl}/api/projects`)
      .pipe(
        tap((data) => {
          this._projects.set(data);
        }),
        catchError((err) => {
          console.log(err)
          this._error.set('Failed to load projects');
          this._projects.set([]);
          return of(null);
        }),
        finalize(() => {
          this._loading.set(false);
        }),
      )
      .subscribe();
  }

  // Method to create project and send it to the API
  createProject(project: Project): void {
    this._loading.set(true);
    this._error.set(null);
    this._success.set(null);

    this.http
      .post<Project>(`${this.apiUrl}/api/projects`, project)
      .pipe(
        tap((newProject) => {
          this._projects.update((currentProjects) => [...currentProjects, newProject]);
          this._success.set('Project created successfully.');
        }),
        catchError((err) => {
          console.error(err);
          this._error.set('Failed to create project.');
          return of(null);
        }),
        finalize(() => {
          this._loading.set(false);
        }),
      )
      .subscribe();
  }

  // Method to update project and send it to the API
  updateProject(project: Project): void {
    this._loading.set(true);
    this._error.set(null);
    this._success.set(null);

    this.http
      .put<Project>(`${this.apiUrl}/api/projects/${project.id}`, project)
      .pipe(
        tap((updatedProject) => {
          this._projects.update((currentProjects) =>
            currentProjects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
          );
          this._success.set('Project updated successfully.');
        }),
        catchError((err) => {
          console.error(err);
          this._error.set('Failed to update project.');
          return of(null);
        }),
        finalize(() => {
          this._loading.set(false);
        }),
      )
      .subscribe();
  }

  // Method to delete a project
  deleteProject(id: number): void {
    this._loading.set(true);
    this._error.set(null);
    this._success.set(null);

    this.http
      .delete<void>(`${this.apiUrl}/api/projects/delete/${id}`)
      .pipe(
        tap(() => {
          this._projects.update((currentProjects) => currentProjects.filter(p => p.id !== id));
          this._success.set('Project deleted successfully.');
        }),
        catchError((err) => {
          console.error(err);
          this._error.set('Failed to delete project.');
          return of(null);
        }),
        finalize(() => {
          this._loading.set(false);
        })
      )
      .subscribe();
  }

  // Method to clear success and error messages
  clearMessages(): void {
    this._error.set(null);
    this._success.set(null);
  }
}
