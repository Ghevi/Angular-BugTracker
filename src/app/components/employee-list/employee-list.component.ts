import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/common/employee';

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

}
