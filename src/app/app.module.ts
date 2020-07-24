import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { EmployeeService } from './services/employee.service';
import { ProjectService } from './services/project.service';
import { TicketsListComponent } from './components/tickets-list/tickets-list.component';
import { ProjectDetailsComponent } from './components/project-list/project-details/project-details.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    ProjectListComponent,
    HeaderComponent,
    NavbarComponent,
    TicketsListComponent,
    ProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    EmployeeService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
