import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ProjectService } from "src/app/services/project.service";
import { Project } from "src/app/common/project";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.css"],
})
export class ProjectDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild("detailContainer", { read: ViewContainerRef })
  detailContainer: ViewContainerRef;
  project: Project;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.project = {
      id: this.route.snapshot.params["id"],
      projectName: this.route.snapshot.params["projectName"],
      description: this.route.snapshot.params["description"],
      stage: this.route.snapshot.params["stage"],
    };
    this.route.params.subscribe((params: Params) => {
      this.project.id = params["id"];
      this.project.projectName = params["projectName"];
      this.project.description = params["description"];
      this.project.stage = params["stage"];
    });
  }

  ngAfterViewInit(): void {
    this.route.data.subscribe((data) => {
      if (!!data && !!data.details && data.details.length > 0) {
        data.details.map((detail) => {
          let componentFactory = this._componentFactoryResolver.resolveComponentFactory(
            detail
          );
          this.detailContainer.createComponent(componentFactory);
          this.projectService.renderRoleAssignment$.next(false);
          this.cdRef.detectChanges();
        });
      }
    });
  }
}
