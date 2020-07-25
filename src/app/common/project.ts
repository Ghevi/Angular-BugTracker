export interface IProject {
  id?: number
  _links?: Links;
  projectName?: string;
  description?: string;
  stage?: string;
}

export class Project implements IProject{
  id: number
  _links?: Links;
  projectName: string;
  description: string;
  stage: string;
}

export class Links {
  self: { href: string };
}
