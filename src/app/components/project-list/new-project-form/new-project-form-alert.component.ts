import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { ProjectService } from "src/app/services/project.service";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { EmployeeService } from "src/app/services/employee.service";
import { IEmployee } from "src/app/common/entities/employee";
import { Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { PropertiesValidator } from "src/app/services/validators/properties.validator";

@Component({
  selector: "app-project-alert",
  templateUrl: "./new-project-form-alert.component.html",
  styleUrls: ["./new-project-form-alert.component.css"],
})
export class NewProjectFormComponent implements OnInit {
  closeNewProjectAlert: Subject<boolean> = new Subject<boolean>();
  private projectUrl = "http://localhost:8080/api/projects/";

  newProjectForm: FormGroup;

  employees: IEmployee[];
  addEmployeeBtnClicked = false;
  formSubmitted = false;
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

  constructor(
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private propertiesValidator: PropertiesValidator,
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
        this.propertiesValidator.projectTakenProperty("projectName")
      ),
      description: new FormControl(null),
      assignedEmployees: new FormControl(null, [Validators.required]),
      employees: new FormArray([]),
    });
  }

  onSubmit() {
    if (!this.newProjectForm.valid) {
      return;
    }

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

  // Consider using this in onSubmit() if switchMap gives trouble

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
