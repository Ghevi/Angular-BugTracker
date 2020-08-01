import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IEmployee } from "src/app/common/entities/employee";
import { Router } from "@angular/router";
import { Observable, fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: "app-new-employee-form",
  templateUrl: "./new-employee-form.component.html",
  styleUrls: ["./new-employee-form.component.css"],
})
export class NewEmployeeFormComponent implements OnInit {
  newEmployeeForm: FormGroup;
  formSubmitted = false;

  @ViewChild("userName") userName: ElementRef;
  @ViewChild("email") email: ElementRef;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newEmployeeForm = new FormGroup({
      userName: new FormControl(
        null,
        Validators.required,
        this.takenUsername.bind(this)
      ),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        this.takenEmail.bind(this)
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

  takenUsername(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      let text$ = fromEvent(this.userName.nativeElement, "keyup")
        .pipe(
          debounceTime(200),
          distinctUntilChanged(),
          switchMap(() => this.employeeService.getEmployeeList())
        )
        .subscribe((employees) => {
          if (employees.length === 0) {
            resolve(null);
          }
          const properties = employees.map((employee) => employee.userName);
          for (let tempProperty of properties) {
            if (tempProperty === control.value) {
              resolve({ usernameIsTaken: true });
            } else {
              resolve(null);
            }
          }
        });
    });
    return promise;
  }

  takenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      let text$ = fromEvent(this.email.nativeElement, "keyup")
        .pipe(
          debounceTime(200),
          distinctUntilChanged(),
          switchMap(() => this.employeeService.getEmployeeList())
        )
        .subscribe((employees) => {
          if (employees.length === 0) {
            resolve(null);
          }
          const properties = employees.map((employee) => employee.email);
          for (let tempProperty of properties) {
            if (tempProperty === control.value) {
              resolve({ emailIsTaken: true });
            } else {
              resolve(null);
            }
          }
        });
    });
    return promise;
  }

  // getControls() {
  //   return (<FormArray>this.newEmployeeForm.get("employees")).controls;
  // }
}
