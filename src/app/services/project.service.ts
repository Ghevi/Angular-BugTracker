import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { IProject, Project } from "../common/entities/project";

interface GetResponse {
  _embedded: {
    projects: Project[];
  };
}

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  private baseUrl = "http://localhost:8080/api/projects";
  renderRoleAssignment$: Subject<boolean> = new Subject<boolean>();
  closeNewProjectForm$: Subject<boolean> = new Subject<boolean>();

  constructor(private httpClient: HttpClient) {
  }

  getProjectList(): Observable<Project[]> {
    return this.httpClient
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.projects));
  }

  getProject(id: number): Observable<IProject> {
    return this.httpClient.get<IProject>(this.baseUrl + "/" + id);
  }
}
