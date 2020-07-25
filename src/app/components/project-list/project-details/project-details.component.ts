import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { ProjectService } from "src/app/services/project.service";
import { IProject } from "src/app/common/project";
import { Subscription } from "rxjs";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.css"],
})
export class ProjectDetailsComponent
  implements OnInit, OnDestroy {
  project: IProject = {};
  getProjectSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.getProjectSub = new Subscription();
  }

  ngOnInit() {
    this.projectService.renderRoleAssignment$.next(false);
    this.listProject();
  }

  listProject() {
    const projectId = this.route.snapshot.params["id"];
    this.getProjectSub = this.projectService
      .getProject(projectId)
      .subscribe((data) => {
        this.project = data;
        console.log(this.project);
        this.addIdToProject(projectId);
        console.log(this.project.id);
      });
  }

  addIdToProject(id: number) {
    this.project.id = id;
    console.log(this.project.id);
    this.route.params.subscribe((params: Params) => {
      this.project.id = id;
    });
  }

  ngOnDestroy() {
    this.getProjectSub.unsubscribe();
  }
}
