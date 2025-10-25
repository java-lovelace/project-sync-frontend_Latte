import {ProjectStatus} from './project-status';

export interface Project {

  // Project fields template (placeholder)
  id: number;
  name: string;
  status: ProjectStatus;
  description: string;
  responsiblePerson: string;

}
