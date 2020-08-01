import { Component, OnInit, OnDestroy, Output } from "@angular/core";
import { IEmployee } from "src/app/common/entities/employee";
import { EmployeeService } from "src/app/services/employee.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { ProjectService } from "src/app/services/project.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list-table.component.html",
  // templateUrl: './employee-list.component.html',
  styleUrls: ["./employee-list.component.css"],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  private baseUrl = "http://localhost:8080/api/employees/";

  employees: IEmployee[];
  renderRoleAssignment: boolean = true;

  roleAssignmentRenderingChangedSubs: Subscription = new Subscription();
  tableChangedSubs: Subscription = new Subscription();
  onDeleteEmployeeSubs: Subscription = new Subscription();


  @Output() cat = 10;

  constructor(
    private employeeService: EmployeeService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Main page

  ngOnInit() {
    const routePath = this.route.snapshot.routeConfig.path;
    if (routePath === "employees") {
      this.listEmployees();
      this.addEmployeeAfterSubmit();
    } else {
      this.displayRoleAssignment();
      this.listEmployees();
    }
  }

  listEmployees() {
    this.employeeService.getEmployeeList().subscribe((employees) => {
      this.employees = employees;
      this.addIdToEmployees();
    });
  }

  addIdToEmployees() {
    for (let employee of this.employees) {
      let href = employee._links.self.href;
      let employeeId = +href.replace(this.baseUrl, "");
      employee.id = employeeId;
    }
  }

  displayRoleAssignment() {
    this.roleAssignmentRenderingChangedSubs = this.projectService.roleAssignmentRenderingChanged$.subscribe(
      (value) => {
        this.renderRoleAssignment = value;
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const user = value.userName;
    const role = value.role;

    for (let employee of this.employees) {
      if (employee.userName == user) {
        employee.role = role;
        this.employeeService.setEmployeeRole(employee, employee.id).subscribe();
      }
    }
  }

  addEmployeeAfterSubmit() {
    this.tableChangedSubs = this.employeeService.employeesTableChanged$.subscribe(
      (newEmp) => {
        this.employees.push(newEmp);
      }
    );
  }

  onDeleteEmployee(index: number) {
    this.onDeleteEmployeeSubs = this.employeeService
      .deleteEmployee(this.employees[index].id)
      .subscribe();
    this.employees.splice(index, 1);
  }

  ngOnDestroy() {
    this.roleAssignmentRenderingChangedSubs.unsubscribe();
    this.tableChangedSubs.unsubscribe();
    this.onDeleteEmployeeSubs.unsubscribe();
  }
}
