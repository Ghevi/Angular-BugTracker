import { _Links } from './_links';

export interface IEmployee {
  id?: number;
  userName?: string;
  email?: string;
  password?: string;
  role?: string;
  _links?: _Links;
}
