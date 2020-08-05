import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map, timeoutWith } from "rxjs/operators";
import { IEmployee } from "../common/entities/employee";

interface GetEmployeeResponse {
  _embedded: {
    employees: IEmployee[];
  };
}

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  private addEmployeeToTable$: Subject<IEmployee> = new Subject<IEmployee>();

  private employeesBaseUrl = "http://localhost:8080/api/employees";

  constructor(private httpClient: HttpClient) {}

  // Components communication

  employeesTableChanged$ = this.addEmployeeToTable$.asObservable();

  addEmployeeToTable(employee: IEmployee) {
    this.addEmployeeToTable$.next(employee);
  }

  // Backend requests

  setEmployeeRole(employee: IEmployee, id: number): Observable<IEmployee> {
    return this.httpClient.put<IEmployee>(
      this.employeesBaseUrl + "/" + id,
      employee
    );
  }

  getEmployeeList(): Observable<IEmployee[]> {
    return this.httpClient
      .get<GetEmployeeResponse>(this.employeesBaseUrl)
      .pipe(map((response) => response._embedded.employees));
  }

  updateEmployee(
    id: number,
    updatedEmployee: IEmployee
  ): Observable<IEmployee> {
    return this.httpClient.patch<IEmployee>(
      this.employeesBaseUrl + "/" + id,
      updatedEmployee
    );
  }

  addEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.httpClient.post<IEmployee>(this.employeesBaseUrl, employee);
  }

  deleteEmployee(id: number): Observable<IEmployee> {
    return this.httpClient.delete<IEmployee>(this.employeesBaseUrl + "/" + id);
  }

  searchEmployees(keyword: string): Observable<IEmployee[]> {
    const searchUrl = `${this.employeesBaseUrl}/search/findByUserNameContaining?userName=${keyword}`;

    return this.httpClient
      .get<GetEmployeeResponse>(searchUrl)
      .pipe(map((response) => response._embedded.employees));
  }
}
