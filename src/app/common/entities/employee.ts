import { _Links } from './_links';

export interface IEmployee {
  id?: number;
  userName?: string;
  email?: string;
  role?: string;
  _links?: _Links;
}

class Employee {
  id: number;
  userName: string;
  email: string;
  role: string;
  _links?: _Links;
}
