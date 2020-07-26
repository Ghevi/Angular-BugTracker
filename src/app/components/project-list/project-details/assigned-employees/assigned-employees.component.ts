import { Component, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/common/entities/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-assigned-employees',
  templateUrl: './assigned-employees.component.html',
  styleUrls: ['./assigned-employees.component.css']
})
export class AssignedEmployeesComponent implements OnInit {
  employees: IEmployee[]

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployeeList().subscribe((data) => {
      this.employees = data;
    })
  }
}
