import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { EmployeeService } from './services/employee.service';
import { ProjectService } from './services/project.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    EmployeeService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
