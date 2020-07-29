import { Component, OnInit, Output } from "@angular/core";
import { IProject } from "src/app/common/entities/project";
import { ProjectService } from "src/app/services/project.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list-table.component.html",
  //templateUrl: './project-list.component.html',
  styleUrls: ["./project-list.component.css"],
})
export class ProjectListComponent implements OnInit {
  private baseUrl = "http://localhost:8080/api/projects/";

  projects: IProject[];
  getProjectsSub: Subscription;
  closeNewProjectFormSubs: Subscription = new Subscription();
  isNewProjectFormClosed = true;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.listProjects();
    this.closeNewProjectFormSubs = this.projectService.closeNewProjectForm$.subscribe(
      (close) => {
        this.isNewProjectFormClosed = close;
      }
    );
  }

  listProjects() {
    this.getProjectsSub = this.projectService
      .getProjectList()
      .subscribe((projects) => {
        this.projects = projects;
        this.addIdToProjects();
      });
  }

  addIdToProjects() {
    // Temporarily adds ids from HATEOS links
    for (let project of this.projects) {
      let href = project._links.self.href;
      let projectId = +href.replace(this.baseUrl, "");
      project.id = projectId;
    }
  }

  onNewProject() {
    this.isNewProjectFormClosed = false;
  }

  ngOnDestroy() {
    this.getProjectsSub.unsubscribe();
    this.closeNewProjectFormSubs.unsubscribe();
  }
}
