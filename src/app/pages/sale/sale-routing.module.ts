import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SaleCreateComponent } from "./components/sale-create/sale-create.component";
import { SaleListComponent } from "./components/sale-list/sale-list.component";

const routes: Routes = [
  {
    path: "",
    component: SaleListComponent,
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: true,
    },
  },
  {
    path: "crear",
    component: SaleCreateComponent,
  },
  {
    path: "crear/:saleId",
    component: SaleCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleRoutingModule {}
