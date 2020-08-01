import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Subject, fromEvent, Observable } from "rxjs";
import { ProjectService } from "src/app/services/project.service";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { EmployeeService } from "src/app/services/employee.service";
import { IProject } from "src/app/common/entities/project";
import { IEmployee } from "src/app/common/entities/employee";
import { Router } from "@angular/router";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  concatMap,
} from "rxjs/operators";

@Component({
  selector: "app-project-alert",
  templateUrl: "./new-project-form-alert.component.html",
  styleUrls: ["./new-project-form-alert.component.css"],
})
export class NewProjectFormComponent implements OnInit {
  closeNewProjectAlert: Subject<boolean> = new Subject<boolean>();
  employees: IEmployee[];
  projects: IProject[];
  newProjectForm: FormGroup;
  addEmployeeBtnClicked = false;
  forbiddenUsernames = [
    "Admin",
    "Manager",
    "Developer",
    "Guest",
    "admin",
    "manager",
    "developer",
    "guest",
  ];
  private projectUrl = "http://localhost:8080/api/projects/";
  formSubmitted = false;

  @ViewChild("projectName") projectName: ElementRef;

  constructor(
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.employeeService.getEmployeeList().subscribe((employees) => {
      this.employees = employees;
    });
    this.newProjectForm = new FormGroup({
      // properties are string so when the files is minified they are not destroyed
      projectName: new FormControl(
        null,
        Validators.required,
        this.takenProjectNames.bind(this)
      ),
      description: new FormControl(null),
      assignedEmployees: new FormControl(null, [Validators.required]),
      employees: new FormArray([]),
    });
  }

  onSubmit() {
    const newProject = this.newProjectForm.value;
    newProject.stage = "In progress";

    this.projectService
      .addProject(newProject)
      .pipe(
        switchMap((newProjectFromServer) =>
          this.projectService.addEmployeesToProject(
            newProjectFromServer.id,
            newProject.assignedEmployees
          )
        )
      )
      .subscribe((secondResult) => {
        this.afterSubmit();
      });

    this.projectService.addProjectToTable(newProject);
  }

  // Consider using this in onSubmit() if concatMap gives trouble

  // public async myFunc(newProject: any): Promise<void> {
  //   const newProjectFromServer = await this.projectService
  //     .addProject(newProject)
  //     .toPromise();

  //   await this.projectService
  //     .addEmployeesToProject(
  //       newProjectFromServer.id,
  //       newProject.assignedEmployees
  //     )
  //     .toPromise();

  //   this.afterSubmit();
  // }

  afterSubmit() {
    this.formSubmitted = true;
    setTimeout(() => {
      this.onFormAlertClose();
    }, 1500);
  }

  onFormAlertClose() {
    this.router.navigate(["projects"]);
  }

  onAddEmployees() {
    this.router.navigate(["projects/new-employee"]);
  }

  takenProjectNames(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      let text$ = fromEvent(this.projectName.nativeElement, "keyup")
        .pipe(
          debounceTime(200),
          distinctUntilChanged(),
          switchMap(() => this.projectService.getProjectList())
        )
        .subscribe((projects) => {
          if (projects.length === 0) {
            resolve(null);
          }
          this.projects = projects;
          const properties = this.projects.map(
            (project) => project.projectName
          );
          for (let tempProperty of properties) {
            if (tempProperty === control.value) {
              resolve({ projectNameIsTaken: true });
            } else {
              resolve(null);
            }
          }
        });
    });
    return promise;
  }

  getControls() {
    return (<FormArray>this.newProjectForm.get("employees")).controls;
  }
}

// Added before routing

// OnSubmit(){
// for (let assignedEmp of newProject.assignedEmployees) {
//   let newEmp = {
//     userName: assignedEmp,
//     email: `${newProject.assignedEmployees}@tempEmail.com`,
//     password: "temp-password",
//     role: "User",
//   };
//   newEmployees.push(newEmp);
// }

// this.projectService.addProject(newProject).subscribe((data) => {
//   this.newProjectFromServer = data;
//   const href = this.newProjectFromServer._links.self.href;
//   const projectId = +href.replace(this.projectUrl, "");
//   // let newEmp2 = {
//   //   userName: "prova",
//   //   email: "prova@gmail.com",
//   //   role: "User",
//   // };
//}

// onAddEmployees() {

// if (!this.addEmployeeBtnClicked) {
//   this.addEmployeeBtnClicked = true;
//   const control = new FormArray(
//     null,
//     [Validators.required, this.forbidUsernames.bind(this)],
//     this.takenUsernames.bind(this)
//   );
//   (<FormArray>this.newProjectForm.get("employees")).push(control);
// } else {
//   this.addEmployeeBtnClicked = false;
//   (<FormArray>this.newProjectForm.get("employees")).removeAt(0);
// }
// }

// forbidUsernames(control: FormControl): { [s: string]: boolean } {
//   for (let employee of control.value) {
//     if (this.forbiddenUsernames.indexOf(employee) !== -1) {
//       return { nameIsForbidden: true };
//     }
//   }
//   return null; // this if username is valid, do not return false
// }
