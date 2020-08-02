import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { ProjectListComponent } from "./components/project-list/project-list.component";
import { ProjectDetailsComponent } from "./components/project-list/project-details/project-details.component";
import { UserSettingsComponent } from "./components/user-settings/user-settings.component";
import { NewEmployeeFormComponent } from "./components/employee-list/new-employee-form/new-employee-form.component";
import { NewProjectFormComponent } from "./components/project-list/new-project-form/new-project-form-alert.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthComponent } from "./components/auth/auth.component";

const routes: Routes = [
  { path: "auth", component: AuthComponent },
  { path: "home", component: HomeComponent },
  { path: "user-settings", component: UserSettingsComponent },
  {
    path: "employees",
    component: EmployeeListComponent,
    children: [{ path: "new-employee", component: NewEmployeeFormComponent }],
  },
  {
    path: "projects",
    component: ProjectListComponent,
    children: [
      { path: "new-project", component: NewProjectFormComponent },
      { path: "new-employee", component: NewEmployeeFormComponent },
      { path: ":id", component: ProjectDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
