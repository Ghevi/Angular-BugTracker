import { Links } from "./project";

export class Employee {
  id: number;
  _links?: Links;
  userName: string;
  email: string;
  role: string;
}
