import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectService } from "src/app/services/project.service";
import { EmployeeService } from "src/app/services/employee.service";
import { IProject } from "src/app/common/entities/project";
import { IEmployee } from "src/app/common/entities/employee";

@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.css"],
})
export class SearchResultComponent implements OnInit {
  projects: IProject[];
  employees: IEmployee[];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.listSearchResults();
  }

  listSearchResults() {
    const searchedType = this.route.snapshot.paramMap.get("type");
    const searchedKeyword: string = this.route.snapshot.paramMap.get("keyword");
    console.log(searchedKeyword);

    switch (searchedType) {
      case "project":
        this.projectService
          .searchProjects(searchedKeyword)
          .subscribe((data) => {
            this.projects = data;
          });
        break;
      case "employee":
        this.employeeService
          .searchEmployees(searchedKeyword)
          .subscribe((data) => {
            this.employees = data;
          });
        break;
    }
  }
}
