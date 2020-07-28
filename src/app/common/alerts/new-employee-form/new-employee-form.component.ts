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

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.newEmployeeForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      role: new FormControl('Admin'),
    });
  }

  onSubmit(){
    const employee: IEmployee = this.newEmployeeForm.value;
    console.log(employee)
    this.employeeService.addEmployee(employee).subscribe(data => {
      console.log(data);
    });
  }

  // getControls() {
  //   return (<FormArray>this.newEmployeeForm.get("employees")).controls;
  // }
}
