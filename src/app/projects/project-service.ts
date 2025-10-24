import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Project} from './project';
import {HttpClient} from '@angular/common/http';
import {catchError, finalize, of, tap} from 'rxjs';
import {ProjectStatus} from "./project-status";

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
  private _pendingProjects: Signal<number> = computed(() => this._projects().filter(project => project.status === ProjectStatus.PENDING).length)
  private _activeProjects: Signal<number> = computed(()=> this._projects().filter(project => project.status === ProjectStatus.ACTIVE).length)
  private _cancelledProjects: Signal<number> = computed(() => this._projects().filter(project => project.status === ProjectStatus.CANCELLED).length)
  private _finishedProjects: Signal<number> = computed(() => this._projects().filter(project => project.status === ProjectStatus.FINISHED).length)


  // Getters for each signal as readonly
  public projects = this._projects.asReadonly();
  public loading = this._loading.asReadonly();
  public error = this._error.asReadonly();
  public success = this._success.asReadonly();

  get totalProjects(): Signal<number> {
    return this._totalProjects;
  }

  get pendingProjects(): Signal<number> {
    return this._pendingProjects;
  }

  get activeProjects(): Signal<number> {
    return this._activeProjects;
  }

  get cancelledProjects(): Signal<number> {
    return this._cancelledProjects;
  }

  get finishedProjects(): Signal<number> {
    return this._finishedProjects;
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
          this._error.set('Failed to load projects.');
          this._projects.set([]);
          return of(null);
        }),
        finalize(() => {
          this._loading.set(false);
        }),
      )
      .subscribe();
  }

  // Method to clear success and error messages
  clearMessages(): void {
    this._error.set(null);
    this._success.set(null);
  }
}
