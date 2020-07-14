import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/common/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list-table.component.html',
  //templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.listEmployees();
  }

  listEmployees(){
    this.employeeService.getEmployeeList().subscribe(
      data => {
        this.employees = data;
      }
    );
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const user = value.userName;
    console.log(user)
    const role = value.role;
    console.log(role)

    for(let employee of this.employees) {
      if(employee.userName == user){
        employee.role = role;
      }
    }
  }

}
