import { Component, OnInit, Output } from "@angular/core";
import { Project } from "src/app/common/project";
import { ProjectService } from "src/app/services/project.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list-table.component.html",
  //templateUrl: './project-list.component.html',
  styleUrls: ["./project-list.component.css"],
})
export class ProjectListComponent implements OnInit {
  projects: Project[];
  getProjectsSub: Subscription;
  private baseUrl = "http://localhost:8080/api/projects/";

  constructor(private projectService: ProjectService) {
    this.getProjectsSub = new Subscription();
  }

  ngOnInit() {
    this.listProjects();
  }

  listProjects() {
    this.getProjectsSub = this.projectService
      .getProjectList()
      .subscribe((data) => {
        this.projects = data;
        this.addIdToProjects();
      });
  }

  addIdToProjects() {
    for (let project of this.projects) {
      let href = project._links.self.href;
      let projectId = +href.replace(this.baseUrl, "");
      project.id = projectId;
    }
  }

  ngOnDestroy() {
    this.getProjectsSub.unsubscribe();
  }
}
