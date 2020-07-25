import { Component, OnInit, OnDestroy } from "@angular/core";
import { IEmployee } from "src/app/common/employee";
import { EmployeeService } from "src/app/services/employee.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { ProjectService } from "src/app/services/project.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list-table.component.html",
  //templateUrl: './employee-list.component.html',
  styleUrls: ["./employee-list.component.css"],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: IEmployee[];
  renderRoleAssignment: boolean;
  renderRoleAssignmentSubs: Subscription = new Subscription();
  private baseUrl = "http://localhost:8080/api/employees/";

  constructor(
    private employeeService: EmployeeService,
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const routePath = this.route.snapshot.routeConfig.path;
    console.log(routePath);
    if (routePath === "employees") {
      this.listEmployees();
      return;
    }
    this.displayRoleAssignment();
    this.listEmployees();
  }

  listEmployees() {
    this.employeeService.getEmployeeList().subscribe((data) => {
      this.employees = data;
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
    this.renderRoleAssignmentSubs = this.projectService.renderRoleAssignment$.subscribe(
      (render) => {
        this.renderRoleAssignment = render;
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

  ngOnDestroy() {
    this.renderRoleAssignmentSubs.unsubscribe();
  }
}
