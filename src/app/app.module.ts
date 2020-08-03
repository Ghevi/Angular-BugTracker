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

import { TicketsListComponent } from "./components/tickets-list/tickets-list.component";
import { ProjectDetailsComponent } from "./components/project-list/project-details/project-details.component";
import { AssignedEmployeesComponent } from "./components/project-list/project-details/assigned-employees/assigned-employees.component";
import { CommonModule } from '@angular/common';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { EmployeeDetailsComponent } from './components/employee-list/employee-details/employee-details.component';
import { NewEmployeeFormComponent } from './components/employee-list/new-employee-form/new-employee-form.component';
import { NewProjectFormComponent } from './components/project-list/new-project-form/new-project-form-alert.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeesAssignmentComponent } from './components/home/charts/employees-assignment/employees-assignment.component';
import { TicketsByPriorityComponent } from './components/home/charts/tickets-by-priority/tickets-by-priority.component';
import { TicketsByStatusComponent } from './components/home/charts/tickets-by-status/tickets-by-status.component';
import { TicketsByTypeComponent } from './components/home/charts/tickets-by-type/tickets-by-type.component';
import { AuthComponent } from './components/auth/auth.component';
import { SearchComponent } from './components/header/search/search.component';

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
    NewProjectFormComponent,
    NewEmployeeFormComponent,
    UserSettingsComponent,
    EmployeeDetailsComponent,
    HomeComponent,
    EmployeesAssignmentComponent,
    TicketsByPriorityComponent,
    TicketsByStatusComponent,
    TicketsByTypeComponent,
    AuthComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
