import { Component, Output, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { ProjectService } from "src/app/services/project.service";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { IEmployee } from '../entities/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: "app-alert",
  templateUrl: "./new-project-form-alert.component.html",
  styleUrls: ["./new-project-form-alert.component.css"],
})
export class AlertComponent implements OnInit {
  closeNewProjectAlert: Subject<boolean> = new Subject<boolean>();
  employees: IEmployee[];
  newProjectForm: FormGroup;
  addEmployeeBtnClicked = false;

  constructor(private projectService: ProjectService, private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployeeList().subscribe(employees => {
      this.employees = employees;
    })
    this.newProjectForm = new FormGroup({
      // properties are string so when the files is minified they are not destroyed
      'projectName': new FormControl(null, Validators.required),
      'description': new FormControl(null),
      'assignedEmployees': new FormControl(null, [Validators.required]),
      'employees': new FormArray([])
    });
  }

  onFormAlertClose() {
    this.projectService.closeNewProjectForm$.next(true);
  }

  onSubmit() {
    console.log(this.newProjectForm);
    this.onFormAlertClose();
  }

  onEmpBtnClicked() {
    this.addEmployeeBtnClicked = true;
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.newProjectForm.get('employees')).push(control);
  }

  getControls() {
    return (<FormArray>this.newProjectForm.get('hobbies')).controls;
  }

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
