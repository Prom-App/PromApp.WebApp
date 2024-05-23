import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ButtonResetFiltersComponent } from "@shared/components/reusables/button-reset-filters/button-reset-filters.component";
import { ExportExcelComponent } from "@shared/components/reusables/export-excel/export-excel.component";
import { FilterDateRangeYmdComponent } from "@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component";
import { MenuComponent } from "@shared/components/reusables/menu/menu.component";
import { SearchBoxMultipleComponent } from "@shared/components/reusables/search-box-multiple/search-box-multiple.component";
import { SharedModule } from "@shared/shared.module";
import { ClientRoutingModule } from "./client-routing.module";
import { ClientListComponent } from "./components/client-list/client-list.component";
import { ClientManageComponent } from "./components/client-manage/client-manage.component";
import { ListTableComponent } from "@shared/components/reusables/list-table/list-table.component";

@NgModule({
  declarations: [ClientListComponent, ClientManageComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
  ],
})
export class ClientModule {}
