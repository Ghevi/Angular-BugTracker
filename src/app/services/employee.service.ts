import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map, timeoutWith } from "rxjs/operators";
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
  closeNewEmployeeForm$: Subject<boolean> = new Subject<boolean>();
  addEmployeeToTable$: Subject<IEmployee> = new Subject<IEmployee>();

  private employeesBaseUrl = "http://localhost:8080/api/employees";
  private projectsBaseUrl = "http://localhost:8080/api/projects";

  constructor(private httpClient: HttpClient) {}

  // Backend requests

  getEmployeeList(): Observable<IEmployee[]> {
    return this.httpClient
      .get<GetResponse>(this.employeesBaseUrl)
      .pipe(map((response) => response._embedded.employees));
  }

  setEmployeeRole(employee: IEmployee, id: number): Observable<IEmployee> {
    return this.httpClient.put<IEmployee>(
      this.employeesBaseUrl + "/" + id,
      employee
    );
  }

  updateEmployee(id: number, updatedEmployee: IEmployee): Observable<IEmployee> {
    return this.httpClient.patch<IEmployee>(this.employeesBaseUrl + "/" + id, updatedEmployee);
  }

  addEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.httpClient.post<IEmployee>(this.employeesBaseUrl, employee);
  }

  deleteEmployee(id: number): Observable<IEmployee> {
    return this.httpClient.delete<IEmployee>(this.employeesBaseUrl + "/" + id);
  }
}
