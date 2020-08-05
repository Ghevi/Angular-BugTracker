import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EmployeeService } from "src/app/services/employee.service";
import { PropertiesValidator } from "src/app/services/validators/properties.validator";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  newAuthForm: FormGroup;
  isLoginMode = true;
  show = false;

  constructor(
    private employeeService: EmployeeService,
    private propertiesValidator: PropertiesValidator
  ) {}

  ngOnInit() {
    this.newAuthForm = new FormGroup({
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
    console.log(this.newAuthForm.value);
    this.newAuthForm.reset();
  }

  onSwitchMode() {
    this.newAuthForm.reset();
    this.isLoginMode = !this.isLoginMode;
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
    return this.newAuthForm.get("password");
  }
}
