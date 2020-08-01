import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IEmployee } from "src/app/common/entities/employee";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-new-employee-form",
  templateUrl: "./new-employee-form.component.html",
  styleUrls: ["./new-employee-form.component.css"],
})
export class NewEmployeeFormComponent implements OnInit {
  newEmployeeForm: FormGroup;
  formSubmitted = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newEmployeeForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      role: new FormControl("Admin"),
    });
  }

  onSubmit() {
    const newEmployee: IEmployee = this.newEmployeeForm.value;
    newEmployee.password = "temp-password";
    this.employeeService.addEmployee(newEmployee).subscribe(() => {
      this.formSubmitted = true;
      this.employeeService.addEmployeeToTable$.next(newEmployee);
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

  // getControls() {
  //   return (<FormArray>this.newEmployeeForm.get("employees")).controls;
  // }
}
