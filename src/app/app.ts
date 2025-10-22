import {Component, signal} from '@angular/core';
import {ProjectList} from './projects/project-list/project-list';
import {ProjectFilter} from './projects/project-filter/project-filter';
import {ProjectService} from './projects/project-service';
import {ProjectHeader} from './projects/project-header/project-header';
import {Project} from './projects/project';
import {ProjectModal} from "./projects/project-modal/project-modal";

@Component({
  selector: 'app-root',
  imports: [ProjectList, ProjectFilter, ProjectHeader, ProjectModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // Define global variables
  isModalOpen = false; // Modal closed by default
  selectedProject: Project | null = null; // Null selected project by default

  // Placeholder project list
  private _projectsList: any[] = [
    {
      id: 1,
      title: "Website RedesignWebsite RedesignWebsite Redesign",
      description: "Complete overhaul of the company website with modern UI/UX design, improved navigation, and mobile responsiveness.",
      status: true,
      person: "David Park"
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Develop a cross-platform mobile app for customers to manage their accounts and track orders.",
      status: false,
      person: "Sophia Lee"
    },
    {
      id: 3,
      title: "Marketing Campaign Launch",
      description: "Create and execute a digital marketing campaign to promote the new product line.",
      status: true,
      person: "Liam Johnson"
    },
    {
      id: 4,
      title: "Database Migration",
      description: "Migrate the company database to a more scalable cloud-based solution with minimal downtime.",
      status: false,
      person: "Olivia Martinez"
    },
    {
      id: 5,
      title: "Security Audit",
      description: "Perform a comprehensive security audit and implement recommended improvements.",
      status: true,
      person: "Ethan Brown"
    },
    {
      id: 6,
      title: "Website Redesign",
      description: "Complete overhaul of the company website with modern UI/UX design, improved navigation, and mobile responsiveness.",
      status: true,
      person: "David Park"
    },
    {
      id: 7,
      title: "Mobile App Development",
      description: "Develop a cross-platform mobile app for customers to manage their accounts and track orders.",
      status: false,
      person: "Sophia Lee"
    },
    {
      id: 8,
      title: "Marketing Campaign Launch",
      description: "Create and execute a digital marketing campaign to promote the new product line.",
      status: true,
      person: "Liam Johnson"
    },
    {
      id: 9,
      title: "Database Migration",
      description: "Migrate the company database to a more scalable cloud-based solution with minimal downtime.",
      status: false,
      person: "Olivia Martinez"
    },
    {
      id: 10,
      title: "Security Audit",
      description: "Perform a comprehensive security audit and implement recommended improvements.",
      status: true,
      person: "Ethan Brown"
    },
    {
      id: 11,
      title: "Website Redesign",
      description: "Complete overhaul of the company website with modern UI/UX design, improved navigation, and mobile responsiveness.",
      status: true,
      person: "David Park"
    },
    {
      id: 12,
      title: "Mobile App Development",
      description: "Develop a cross-platform mobile app for customers to manage their accounts and track orders.",
      status: false,
      person: "Sophia Lee"
    },
    {
      id: 13,
      title: "Marketing Campaign Launch",
      description: "Create and execute a digital marketing campaign to promote the new product line.",
      status: true,
      person: "Liam Johnson"
    },
    {
      id: 14,
      title: "Database Migration",
      description: "Migrate the company database to a more scalable cloud-based solution with minimal downtime.",
      status: false,
      person: "Olivia Martinez"
    },
    {
      id: 15,
      title: "Security Audit",
      description: "Perform a comprehensive security audit and implement recommended improvements.",
      status: true,
      person: "Ethan Brown"
    }
  ];

  // Define constructor
  constructor(private projectService: ProjectService) {

    // Send placeholder list to service
    this.projectService.projects.set(this._projectsList)
  }

  // Getters for each stat
  get projects() {
    return this.projectService.projects()
  }

  get totalProjects() {
    return this.projectService.totalProjects();
  }

  get trueProjects() {
    return this.projectService.trueProjects();
  }

  get falseProjects() {
    return this.projectService.falseProjects();
  }

  // Handle open modal
  openModal() {
    this.isModalOpen = true;
    document.body.classList.add('overflow-y-hidden');
  }

  // Handle close modal
  closeModal() {
    this.isModalOpen = false;
    document.body.classList.remove('overflow-y-hidden');
  }

  // Handle add click event
  handleAddClick() {
    this.selectedProject = null;
    this.openModal()
  }

  // Handle edit click event
  handleEditClick(project: Project) {
    this.selectedProject = {...project};
    this.openModal()
  }

  // Handle save or update project
  saveProject(project: Project) {
    this.projectService.saveProject(project)
    this.closeModal()
  }

  // Handle delete project
  handleDelete(id: number) {
    this.projectService.deleteProject(id)
    this.closeModal()
  }


}
