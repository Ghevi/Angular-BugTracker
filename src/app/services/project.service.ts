import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { IProject } from "../common/entities/project";
import { identifierModuleUrl } from "@angular/compiler";
import { IEmployee } from "../common/entities/employee";
import { _Links } from "../common/entities/_links";

interface GetProjectsResponse {
  _embedded: {
    projects: IProject[];
  };
}

// interface GetProjectEmployeesResponse {
//   _embedded: {
//     employees: IEmployee[];
//   };
// }

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  private baseUrl = "http://localhost:8080/api/projects";
  private renderRoleAssignment$: Subject<boolean> = new Subject<boolean>();
  private addProjectToTable$: Subject<IProject> = new Subject<IProject>();

  constructor(private httpClient: HttpClient) {}

  // Component communication

  roleAssignmentRenderingChanged$ = this.renderRoleAssignment$.asObservable();

  renderRoleAssignment(value: boolean) {
    this.renderRoleAssignment$.next(value);
  }

  projectsTableChanged$ = this.addProjectToTable$.asObservable();

  addProjectToTable(project: IProject) {
    this.addProjectToTable$.next(project);
  }

  // Backend requests

  getProjectList(): Observable<IProject[]> {
    return this.httpClient
      .get<GetProjectsResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.projects));
  }

  getProject(id: number): Observable<IProject> {
    return this.httpClient.get<IProject>(this.baseUrl + "/" + id);
  }

  addProject(project: IProject): Observable<IProject> {
    return this.httpClient.post<IProject>(this.baseUrl, project);
  }

  addEmployeesToProject(
    projectId: number,
    employees: IEmployee[]
  ): Observable<IEmployee[]> {
    return this.httpClient.post<IEmployee[]>(
      `${this.baseUrl}/${projectId}/employees`,
      {
        _embedded: { employees },
      }
    );
  }

  deleteProject(id: number): Observable<IProject> {
    return this.httpClient.delete<IProject>(this.baseUrl + "/" + id);
  }

  searchProjects(keyword: string): Observable<IProject[]> {
    const searchUrl = `${this.baseUrl}/search/findByProjectNameContaining?projectName=${keyword}`;

    return this.httpClient
      .get<GetProjectsResponse>(searchUrl)
      .pipe(map((response) => response._embedded.projects));
  }
}
