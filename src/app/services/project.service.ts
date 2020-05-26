import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../common/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost:8080/api/projects';

  constructor(private httpClient: HttpClient) { }

  getProjectList(): Observable<Project[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.projects)
    );
  }
}

interface GetResponse {
 _embedded: {
   projects: Project[];
 }
}
