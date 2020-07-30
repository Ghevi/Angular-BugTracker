import { Component, Output, OnInit } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { ProjectService } from "src/app/services/project.service";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { IEmployee } from "../../entities/employee";
import { EmployeeService } from "src/app/services/employee.service";
import { IProject } from "../../entities/project";

@Component({
  selector: "app-project-alert",
  templateUrl: "./new-project-form-alert.component.html",
  styleUrls: ["./new-project-form-alert.component.css"],
})
export class AlertComponent implements OnInit {
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

  constructor(
    private projectService: ProjectService,
    private employeeService: EmployeeService
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

  onFormAlertClose() {
    this.projectService.closeNewProjectForm();
    this.newProjectForm.reset();
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
      // let newEmp2 = {
      //   userName: "prova",
      //   email: "prova@gmail.com",
      //   role: "User",
      // };
      this.employeeService.addEmployeesToProject(this.newEmployees, projectId);
    });
    this.onFormAlertClose();
  }

  // assignedEmployees: ["lol"]
  // description: "sdg"
  // employees: []
  // projectName: "fgds"

  onEmpBtnClicked() {
    if (!this.addEmployeeBtnClicked) {
      this.addEmployeeBtnClicked = true;
      const control = new FormArray(
        null,
        [Validators.required, this.forbidUsernames.bind(this)],
        this.takenUsernames.bind(this)
      );
      (<FormArray>this.newProjectForm.get("employees")).push(control);
    } else {
      this.addEmployeeBtnClicked = false;
      (<FormArray>this.newProjectForm.get("employees")).removeAt(0);
    }
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

  // Tentative of multi selector in select employees
  //   employeeMouseDown( event: any ) {
  //     event.stopPropagation();
  //     let scrollTop = 0;
  //     if ( event.target.parentNode ) {
  //         scrollTop = event.target.parentNode.scrollTop;
  //     }
  //     const stringValue = event.target.value.split( '\'' )[1];
  //     const index = this.employees.indexOf( stringValue, 0 );
  //     if ( index > -1 ) {
  //         this.employees.splice( index, 1 );
  //     } else {
  //         this.employees.push( stringValue );
  //     }
  //     // to make angular aware there is something new
  //     const tmp = this.employees;
  //     this.employees = [];
  //     for ( let i = 0; i < tmp.length; i++ ) {
  //         this.employees[i] = tmp[i];
  //     }
  //     setTimeout(( function() { event.target.parentNode.scrollTop = scrollTop; } ), 0 );
  //     setTimeout(( function() { event.target.parentNode.focus(); } ), 0 );
  //     return false;
  // }
}
