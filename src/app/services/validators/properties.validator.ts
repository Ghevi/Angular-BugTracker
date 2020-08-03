import { Injectable } from "@angular/core";
import { EmployeeService } from "../employee.service";
import { AsyncValidatorFn, AbstractControl } from "@angular/forms";
import { Observable, timer } from "rxjs";
import { switchMap, map, distinctUntilChanged } from "rxjs/operators";
import { ProjectService } from "../project.service";

@Injectable({
  providedIn: "root",
})
export class PropertiesValidator {
  constructor(
    private employeeService: EmployeeService,
    private projectService: ProjectService
  ) {}

  employeeTakenProperty(property: string): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      return timer(500).pipe(
        switchMap(() =>
          this.employeeService.getEmployeeList().pipe(
            map((employees) => {
              const foundEmployee = employees.find(
                (employee) => employee[property] === control.value
              );
              if (foundEmployee) {
                return { isTaken: true };
              }
            })
          )
        )
      );
    };
  }

  projectTakenProperty(property: string): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      return timer(500).pipe(
        switchMap(() =>
          this.projectService.getProjectList().pipe(
            map((projects) => {
              const foundProjects = projects.find(
                (project) => project[property] === control.value
              );
              if (foundProjects) {
                return { isTaken: true };
              }
            })
          )
        )
      );
    };
  }
}

// No more necessary
// return { [`${property.toLowerCase()}IsTaken`]: true };
