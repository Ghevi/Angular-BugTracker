import { Component, OnInit, Output } from "@angular/core";
import { IProject } from "src/app/common/entities/project";
import { ProjectService } from "src/app/services/project.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list-table.component.html",
  //templateUrl: './project-list.component.html',
  styleUrls: ["./project-list.component.css"],
})
export class ProjectListComponent implements OnInit {
  private baseUrl = "http://localhost:8080/api/projects/";

  projects: IProject[];
  getProjectsSub: Subscription = new Subscription();
  projectsTableChangedSubs: Subscription = new Subscription();

  constructor(
    private projectService: ProjectService,
    public route: ActivatedRoute,
    public router: Router,
  ) {}

  ngOnInit() {
    this.listProjects();
    this.addProjectAfterSubmit();
  }

  listProjects() {
    this.getProjectsSub = this.projectService
      .getProjectList()
      .subscribe((projects) => {
        this.projects = projects;
      });
  }

  addProjectAfterSubmit() {
    this.projectsTableChangedSubs = this.projectService.projectsTableChanged$.subscribe(
      (newProj) => {
        this.projects.push(newProj);
      }
    );
  }

  onDeleteProject(index: number) {
    this.projectService.deleteProject(this.projects[index].id).subscribe();
    this.projects.splice(index, 1);
  }

  ngOnDestroy() {
    this.getProjectsSub.unsubscribe();
    this.projectsTableChangedSubs.unsubscribe();
  }
}


// Temporarily adds ids from HATEOS links, before exposing ids in Spring Data Rest
// addIdToProjects(projects: IProject[]) {
  //   for (let project of projects) {
  //     let href = project._links.self.href;
  //     let projectId = +href.replace(this.baseUrl, "");
  //     project.id = projectId;
  //   }
  //   return projects;
  // }
