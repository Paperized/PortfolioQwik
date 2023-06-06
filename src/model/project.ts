export interface Project {
  id?: number;
  name: string;
  description: string;
  tags: string[];
  project_owner: string;
  link?: string;
  preview_image?: string;
}