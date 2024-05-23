import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ButtonResetFiltersComponent } from "@shared/components/reusables/button-reset-filters/button-reset-filters.component";
import { ExportExcelComponent } from "@shared/components/reusables/export-excel/export-excel.component";
import { FilterDateRangeYmdComponent } from "@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component";
import { ImgSelectorComponent } from "@shared/components/reusables/img-selector/img-selector.component";
import { ListTableSimpleComponent } from "@shared/components/reusables/list-table-simple/list-table-simple.component";
import { ListTableComponent } from "@shared/components/reusables/list-table/list-table.component";
import { MenuComponent } from "@shared/components/reusables/menu/menu.component";
import { SearchBoxMultipleComponent } from "@shared/components/reusables/search-box-multiple/search-box-multiple.component";
import { SelectAutocompleteComponent } from "@shared/components/reusables/select-autocomplete/select-autocomplete.component";
import { SharedModule } from "@shared/shared.module";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductManageComponent } from "./components/product-manage/product-manage.component";
import { ProductStockWarehouseComponent } from "./components/product-stock-warehouse/product-stock-warehouse.component";
import { ProductRoutingModule } from "./product-routing.module";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductManageComponent,
    ProductStockWarehouseComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
    SelectAutocompleteComponent,
    ImgSelectorComponent,
    ListTableSimpleComponent,
  ],
})
export class ProductModule {}
