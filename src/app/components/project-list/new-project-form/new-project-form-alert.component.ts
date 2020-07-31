import { Component, Output, OnInit } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { ProjectService } from "src/app/services/project.service";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { EmployeeService } from "src/app/services/employee.service";
import { IProject } from 'src/app/common/entities/project';
import { IEmployee } from 'src/app/common/entities/employee';
import { Router } from '@angular/router';

@Component({
  selector: "app-project-alert",
  templateUrl: "./new-project-form-alert.component.html",
  styleUrls: ["./new-project-form-alert.component.css"],
})
export class NewProjectFormComponent implements OnInit {
  closeNewProjectAlert: Subject<boolean> = new Subject<boolean>();
  employees: IEmployee[];
  newProjectFromServer: IProject;
  newEmployees: IEmployee[] = [];
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
      projectName: new FormControl(null, Validators.required),
      description: new FormControl(null),
      assignedEmployees: new FormControl(null, [Validators.required]),
      employees: new FormArray([]),
    });
  }

  onSubmit() {
    const newProject = this.newProjectForm.value;
    console.log(newProject);
    newProject.stage = "In progress";

    for (let assignedEmp of newProject.assignedEmployees) {
      let newEmp = {
        userName: assignedEmp,
        email: `${newProject.assignedEmployees}@tempEmail.com`,
        role: "User",
      };
      this.newEmployees.push(newEmp);
    }

    this.projectService.addProject(newProject).subscribe((data) => {
      this.newProjectFromServer = data;
      const href = this.newProjectFromServer._links.self.href;
      const projectId = +href.replace(this.projectUrl, "");
      console.log(projectId);
      // let newEmp2 = {
      //   userName: "prova",
      //   email: "prova@gmail.com",
      //   role: "User",
      // };
      this.projectService.addEmployeesToProject(projectId, this.newEmployees).subscribe(data => {
        console.log(data);
      });
      this.projectService.addProjectToTable$.next(newProject);
      this.beforeSubmit();
    });
  }

  beforeSubmit() {
    this.formSubmitted = true;
    setTimeout(() => {
      this.onFormAlertClose();
    }, 1500);
  }

  onFormAlertClose() {
    this.newProjectForm.reset();
    this.router.navigate(["projects"]);
  }

  onAddEmployees() {
    this.router.navigate(["projects/new-employee"]);
  }

  forbidUsernames(control: FormControl): { [s: string]: boolean } {
    console.log("works");
    for (let employee of control.value) {
      if (this.forbiddenUsernames.indexOf(employee) !== -1) {
        return { nameIsForbidden: true };
      }
    }
    return null; // this if username is valid, do not return false
  }

  takenUsernames(control: FormControl): Promise<any> | Observable<any> {
    console.log("works");
    const promise = new Promise<any>((resolve, reject) => {
      const observable = this.employeeService
        .getEmployeeList()
        .subscribe((employees) => {
          this.employees = employees;
          const usernames = this.employees.map((employee) => employee.userName);
          for (let employee of control.value) {
            if (usernames.indexOf(employee) !== -1) {
              resolve({ usernameIsTaken: true });
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
