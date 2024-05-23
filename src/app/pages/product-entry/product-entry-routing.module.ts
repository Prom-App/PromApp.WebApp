import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductEntryListComponent } from "./components/product-entry-list/product-entry-list.component";
import { ProductEntryCreateComponent } from "./components/product-entry-create/product-entry-create.component";

const routes: Routes = [
  {
    path: "",
    component: ProductEntryListComponent,
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: true,
    },
  },
  {
    path: "crear",
    component: ProductEntryCreateComponent,
  },
  {
    path: "crear/:productEntryId",
    component: ProductEntryCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductEntryRoutingModule {}
