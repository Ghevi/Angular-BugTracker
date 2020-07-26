import { _Links } from './_links';

export interface IProject {
  id?: number
  projectName?: string;
  description?: string;
  stage?: string;
  _links?: _Links;
}

export class Project implements IProject{
  id: number
  projectName: string;
  description: string;
  stage: string;
  _links?: _Links;
}

