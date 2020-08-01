import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EmployeeService } from "src/app/services/employee.service";
import { IEmployee } from "src/app/common/entities/employee";
import { Observable, fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: "app-user-settings",
  templateUrl: "./user-settings.component.html",
  styleUrls: ["./user-settings.component.css"],
})
export class UserSettingsComponent implements OnInit {
  newSettingsForm: FormGroup;
  loggedUser: IEmployee;
  show = false;

  @ViewChild("userName") userName: ElementRef;
  @ViewChild("email") email: ElementRef;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.newSettingsForm = new FormGroup({
      userName: new FormControl(
        null,
        Validators.required,
        this.takenUsername.bind(this)
      ),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        this.takenEmail.bind(this)
      ),
      password: new FormControl(null, [
        Validators.required,
        this.validPassword.bind(this),
      ]),
    });
    this.newSettingsForm.reset();
  }

  onSubmit() {
    const updatedEmployee: IEmployee = this.newSettingsForm.value;
    this.employeeService
      .updateEmployee(9, updatedEmployee)
      .subscribe((data) => {
        console.log(data);
      });
  }

  onResetForm() {
    this.newSettingsForm.reset();
  }

  onShowPassword() {
    this.show = !this.show;
  }

  validPassword(control: FormControl): { [s: string]: boolean } {
    const passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
    if (!passwordRegex.test(control.value)) {
      return { passwordIsInvalid: true };
    }
    return null;
  }

  takenUsername(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      let text$ = fromEvent(this.userName.nativeElement, "keyup")
        .pipe(
          debounceTime(200),
          distinctUntilChanged(),
          switchMap(() => this.employeeService.getEmployeeList())
        )
        .subscribe((employees) => {
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

  takenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      let text$ = fromEvent(this.email.nativeElement, "keyup")
        .pipe(
          debounceTime(200),
          distinctUntilChanged(),
          switchMap(() => this.employeeService.getEmployeeList())
        )
        .subscribe((employees) => {
          const properties = employees.map((employee) => employee.email);
          for (let tempProperty of properties) {
            if (tempProperty === control.value) {
              resolve({ emailIsTaken: true });
            } else {
              resolve(null);
            }
          }
        });
    });
    return promise;
  }

  get password() {
    return this.newSettingsForm.get("password");
  }
}
