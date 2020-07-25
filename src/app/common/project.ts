export class Project {
  id: number // initially undefined, a value will be assigned in project-list component
  _links?: Links;
  projectName: string;
  description: string;
  stage: string;
}

export class Links {
  self: { href: string };
}
