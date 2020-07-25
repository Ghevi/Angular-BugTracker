import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Employee } from "../common/employee";
import { Links } from "../common/project";

interface GetResponse {
  _embedded: {
    employees: Employee[];
  };
}

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  private baseUrl = "http://localhost:8080/api/employees";

  constructor(private httpClient: HttpClient) {}

  getEmployeeList(): Observable<Employee[]> {
    return this.httpClient
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.employees));
  }

  setEmployeeRole(employee: Employee, id: number): Observable<Employee> {
    return this.httpClient
      .put<Employee>(this.baseUrl + "/" + id, employee);

  }
}
