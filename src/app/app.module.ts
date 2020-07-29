import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { ProjectListComponent } from "./components/project-list/project-list.component";
import { HeaderComponent } from "./components/header/header.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

import { EmployeeService } from "./services/employee.service";
import { ProjectService } from "./services/project.service";
import { TicketsListComponent } from "./components/tickets-list/tickets-list.component";
import { ProjectDetailsComponent } from "./components/project-list/project-details/project-details.component";
import { AssignedEmployeesComponent } from "./components/project-list/project-details/assigned-employees/assigned-employees.component";
import { AlertComponent } from "./common/alerts/new-project-form/new-project-form-alert.component";
import { CommonModule } from '@angular/common';
import { NewEmployeeFormComponent } from './common/alerts/new-employee-form/new-employee-form.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    ProjectListComponent,
    HeaderComponent,
    NavbarComponent,
    TicketsListComponent,
    ProjectDetailsComponent,
    AssignedEmployeesComponent,
    AlertComponent,
    NewEmployeeFormComponent,
    UserSettingsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [EmployeeService, ProjectService],
  bootstrap: [AppComponent],
})
export class AppModule {}
