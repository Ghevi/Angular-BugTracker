import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, find } from 'rxjs/operators';
import { Employee } from '../common/employee';

interface GetResponse {
 _embedded: {
   employees: Employee[];
 }
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8080/api/employees';

  constructor(private httpClient: HttpClient) { }

  getEmployeeList(): Observable<Employee[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.employees)
    );
  }

  setEmployeeRole(userName: string, role: string): Observable<Employee[]> {
    return this.httpClient.patch<GetResponse>(this.baseUrl, role).pipe(
      map(response => response._embedded.employees)
    );
  }
}
