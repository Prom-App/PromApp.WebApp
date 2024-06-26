import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ExportExcelComponent } from "@shared/components/reusables/export-excel/export-excel.component";
import { FilterDateRangeYmdComponent } from "@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component";
import { ListTableComponent } from "@shared/components/reusables/list-table/list-table.component";
import { MenuComponent } from "@shared/components/reusables/menu/menu.component";
import { SearchBoxMultipleComponent } from "@shared/components/reusables/search-box-multiple/search-box-multiple.component";
import { SharedModule } from "@shared/shared.module";
import { CategoryRoutingModule } from "./category-routing.module";
import { CategoryListComponent } from "./components/category-list/category-list.component";
import { CategoryManageComponent } from "./components/category-manage/category-manage.component";
import { ButtonResetFiltersComponent } from "@shared/components/reusables/button-reset-filters/button-reset-filters.component";

@NgModule({
  declarations: [CategoryListComponent, CategoryManageComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent
  ],
})
export class CategoryModule {}
