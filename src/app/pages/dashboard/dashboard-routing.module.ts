import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { VexRoutes } from "src/@vex/interfaces/vex-route.interface";
import { DashboardListComponent } from "./dashboard-list/dashboard-list.component";

const routes: VexRoutes = [
  {
    path: "",
    component: DashboardListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
