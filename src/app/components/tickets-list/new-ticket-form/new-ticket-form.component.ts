import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IEmployee } from "src/app/common/entities/employee";
import { Router } from "@angular/router";
import { Observable, fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: "app-new-employee-form",
  templateUrl: "./new-ticket-form.component.html",
  styleUrls: ["./new-ticket-form.component.css"],
})
export class NewEmployeeFormComponent implements OnInit {
  newTicketForm: FormGroup;
  formSubmitted = false;
  editMode = false;

  @ViewChild("ticketTitle") ticketTitle: ElementRef;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.editMode === false) {
      this.initializeFormGroup();
    } else {
      const editTicketForm = this.newTicketForm;
    }
  }

  initializeFormGroup() {
    this.newTicketForm = new FormGroup({
      ticketTitle: new FormControl(
        null,
        Validators.required,
        this.takenTicketTitle.bind(this)
      ),
      ticketDescription: new FormControl(null, Validators.required),
      ticketPriority: new FormControl(null, Validators.required),
      ticketStatus: new FormControl(null, Validators.required),
      ticketType: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const newTicket = this.newTicketForm.value;
    if (this.editMode === true) {
      newTicket.updated = Date.now();
    } else {
      newTicket.updated = "000000";
      newTicket.created = Date.now();
    }
    this.beforeSubmit();
  }

  beforeSubmit() {
    setTimeout(() => {
      this.onCloseEmployeeForm();
      this.newTicketForm.reset();
    }, 1500);
  }

  onCloseEmployeeForm() {
    const activeRoute = this.router.url;
    this.router.navigate(["tickets"]);
  }

  takenTicketTitle(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      let text$ = fromEvent(this.ticketTitle.nativeElement, "keyup")
        .pipe(
          debounceTime(200),
          distinctUntilChanged(),
          switchMap(() => this.employeeService.getEmployeeList())
        )
        .subscribe((employees) => {
          if (employees.length === 0) {
            resolve(null);
          }
          const properties = employees.map((employee) => employee.userName);
          for (let tempProperty of properties) {
            if (tempProperty === control.value) {
              resolve({ usernameIsTaken: true });
            } else {
              resolve(null);
            }
          }
        });
    });
    return promise;
  }
}
