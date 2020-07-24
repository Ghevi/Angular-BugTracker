import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Project } from "../common/project";

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
  renderRoleAssignment$: Subject<boolean>;

  constructor(private httpClient: HttpClient) {
    this.renderRoleAssignment$ = new Subject<boolean>();
  }

  getProjectList(): Observable<Project[]> {
    return this.httpClient
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.projects));
  }

  
}
