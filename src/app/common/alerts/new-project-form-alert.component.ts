import { Component, Output, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { ProjectService } from "src/app/services/project.service";
import { FormGroup } from "@angular/forms";
import { IEmployee } from '../entities/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: "app-alert",
  templateUrl: "./new-project-form-alert.component.html",
  styleUrls: ["./new-project-form-alert.component.css"],
})
export class AlertComponent implements OnInit {
  closeNewProjectAlert: Subject<boolean> = new Subject<boolean>();
  newProjectForm: FormGroup;
  employees: IEmployee[];

  constructor(private projectService: ProjectService, private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployeeList().subscribe(employees => {
      this.employees = employees;
    })
    this.newProjectForm = new FormGroup({});
  }

  onClose() {
    this.projectService.closeNewProjectForm$.next(true);
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
