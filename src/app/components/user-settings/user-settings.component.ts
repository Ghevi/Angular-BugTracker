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
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from "rxjs/operators";
import { PropertiesValidator } from "src/app/services/validators/properties.validator";

@Component({
  selector: "app-user-settings",
  templateUrl: "./user-settings.component.html",
  styleUrls: ["./user-settings.component.css"],
})
export class UserSettingsComponent implements OnInit {
  newSettingsForm: FormGroup;
  loggedUser: IEmployee;
  show = false;
  showSubmitted = false;

  constructor(
    private employeeService: EmployeeService,
    private propertiesValidator: PropertiesValidator
  ) {}

  ngOnInit(): void {
    this.newSettingsForm = new FormGroup({
      userName: new FormControl(
        null,
        Validators.required,
        this.propertiesValidator.employeeTakenProperty("userName")
      ),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        this.propertiesValidator.employeeTakenProperty("email")
      ),
      password: new FormControl(null, [
        Validators.required,
        this.validPassword.bind(this),
      ]),
    });
  }

  onSubmit() {
    const updatedEmployee: IEmployee = this.newSettingsForm.value;
    this.employeeService
      .updateEmployee(10, updatedEmployee)
      .subscribe((data) => {
        console.log(data);
      });

    this.showSubmitted = !this.showSubmitted;
    setTimeout(() => {
      this.showSubmitted = !this.showSubmitted;
    }, 2000);

    this.newSettingsForm.reset();
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

  get password() {
    return this.newSettingsForm.get("password");
  }
}
