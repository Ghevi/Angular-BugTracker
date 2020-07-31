import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IEmployee } from "src/app/common/entities/employee";
import { Router } from "@angular/router";

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
    this.employeeService.addEmployee(newEmployee).subscribe(() => {
      this.formSubmitted = true;
      this.employeeService.addEmployeeToTable$.next(newEmployee);
    });
    this.newEmployeeForm.reset();
    setTimeout(() => {
      this.onCloseEmployeeForm();
    }, 1500);
  }

  onCloseEmployeeForm() {
    this.router.navigate(["employees"]);
  }

  // getControls() {
  //   return (<FormArray>this.newEmployeeForm.get("employees")).controls;
  // }
}
