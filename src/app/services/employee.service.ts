import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IEmployee } from "../common/entities/employee";

interface GetResponse {
  _embedded: {
    employees: IEmployee[];
  };
}

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  private baseUrl = "http://localhost:8080/api/employees";

  constructor(private httpClient: HttpClient) {}

  getEmployeeList(): Observable<IEmployee[]> {
    return this.httpClient
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.employees));
  }

  setEmployeeRole(employee: IEmployee, id: number): Observable<IEmployee> {
    return this.httpClient.put<IEmployee>(this.baseUrl + "/" + id, employee);
  }

  // getAssignedEmployees(): Observable<IEmployee[]> {
  //   return this.httpClient
  //     .get<GetResponse>(this.baseUrl)
  //     .pipe(map((response) => response._embedded.employees));
  // }
}
