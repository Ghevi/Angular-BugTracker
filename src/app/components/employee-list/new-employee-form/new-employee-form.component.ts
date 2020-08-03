import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import {
  FormGroup,
  FormControl,
  Validators,
  AsyncValidator,
  AbstractControl,
  AsyncValidatorFn,
} from "@angular/forms";
import { IEmployee } from "src/app/common/entities/employee";
import { Router } from "@angular/router";
import { Observable, fromEvent, timer } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from "rxjs/operators";
import { PropertiesValidator } from "src/app/services/validators/properties.validator";

@Component({
  selector: "app-new-employee-form",
  templateUrl: "./new-employee-form.component.html",
  styleUrls: ["./new-employee-form.component.css"],
})
export class NewEmployeeFormComponent implements OnInit {
  newEmployeeForm: FormGroup;
  formSubmitted = false;

  public username: string = "";

  constructor(
    private employeeService: EmployeeService,
    private propertiesValidator: PropertiesValidator,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newEmployeeForm = new FormGroup({
      userName: new FormControl(
        null,
        Validators.required,
        this.propertiesValidator.employeeTakenProperty("userName")
      ),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        this.propertiesValidator.employeeTakenProperty("email")
      ),
      role: new FormControl("Admin"),
    });
  }

  onSubmit() {
    const newEmployee: IEmployee = this.newEmployeeForm.value;
    newEmployee.password = "temp-password";
    this.employeeService.addEmployee(newEmployee).subscribe(() => {
      this.formSubmitted = true;
      this.employeeService.addEmployeeToTable(newEmployee);
      this.beforeSubmit();
    });
  }

  beforeSubmit() {
    setTimeout(() => {
      this.onCloseEmployeeForm();
      this.newEmployeeForm.reset();
    }, 1500);
  }

  onCloseEmployeeForm() {
    const activeRoute = this.router.url;
    if (activeRoute.includes("projects")) {
      this.router.navigate(["projects/new-project"]);
    } else if (activeRoute.includes("employees")) {
      this.router.navigate(["employees"]);
    }
  }

  takenUsername(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      return timer(500).pipe(
        switchMap(() =>
          this.employeeService.getEmployeeList().pipe(
            map((employees) => {
              const foundEmployee = employees.find(
                (employee) => employee.userName === control.value
              );
              if (foundEmployee) {
                return { usernameIsTaken: true };
              }
            })
          )
        )
      );
    };
  }

  // getControls() {
  //   return (<FormArray>this.newEmployeeForm.get("employees")).controls;
  // }
}
