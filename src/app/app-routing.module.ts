import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { ProjectListComponent } from "./components/project-list/project-list.component";
import { ProjectDetailsComponent } from "./components/project-list/project-details/project-details.component";
import { UserSettingsComponent } from './components/user-settings/user-settings.component';

const routes: Routes = [
  { path: "user-settings", component: UserSettingsComponent},
  { path: "employees", component: EmployeeListComponent },
  { path: "projects", component: ProjectListComponent },
  {
    path: "projects/:id",
    component: ProjectDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
