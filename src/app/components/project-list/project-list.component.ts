import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/common/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list-table.component.html',
  //templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.listProjects();
  }

  listProjects(){
    this.projectService.getProjectList().subscribe(
      data => {
        this.projects = data;
      }
    );
  }

}
