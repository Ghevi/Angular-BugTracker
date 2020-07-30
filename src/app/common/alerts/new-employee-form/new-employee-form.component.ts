import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { IEmployee } from "../../entities/employee";

@Component({
  selector: "app-new-employee-form",
  templateUrl: "./new-employee-form.component.html",
  styleUrls: ["./new-employee-form.component.css"],
})
export class NewEmployeeFormComponent implements OnInit {
  newEmployeeForm: FormGroup;
  formSubmitted = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.newEmployeeForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      role: new FormControl('Admin'),
    });
  }

  onSubmit(){
    const newEmployee: IEmployee = this.newEmployeeForm.value;
    this.employeeService.addEmployee(newEmployee).subscribe(() => {
      this.formSubmitted = true;
    });
    this.newEmployeeForm.reset();
    setTimeout(() => {
      this.onCloseEmployeeForm();
    }, 1500)
  }

  onCloseEmployeeForm() {
    this.employeeService.closeNewEmployeeForm();
  }

  // getControls() {
  //   return (<FormArray>this.newEmployeeForm.get("employees")).controls;
  // }
}

