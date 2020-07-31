import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { IProject } from "../common/entities/project";

interface GetResponse {
  _embedded: {
    projects: IProject[];
  };
}

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  private baseUrl = "http://localhost:8080/api/projects";
  renderRoleAssignment$: Subject<boolean> = new Subject<boolean>();
  addProjectToTable$: Subject<IProject> = new Subject<IProject>();

  constructor(private httpClient: HttpClient) {
  }

  // Backend requests

  getProjectList(): Observable<IProject[]> {
    return this.httpClient
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.projects));
  }

  getProject(id: number): Observable<IProject> {
    return this.httpClient.get<IProject>(this.baseUrl + "/" + id);
  }

  addProject(project: IProject): Observable<IProject> {
    return this.httpClient.post<IProject>(this.baseUrl, project);
  }

  // Components communication

}
