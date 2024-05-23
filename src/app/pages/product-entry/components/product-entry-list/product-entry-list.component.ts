import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RowClick } from "@shared/models/row-click.interface";
import {
  DateRange,
  SearchFilter,
} from "@shared/models/search-options.interface";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import Swal from "sweetalert2";
import { ProductEntryResponse } from "../../models/product-entry-response.interface";
import { ProductEntryService } from "../../services/product-entry.service";
import { componentSettings } from "./product-entry-list-config";

@Component({
  selector: "vex-product-entry-list",
  templateUrl: "./product-entry-list.component.html",
  styleUrls: ["./product-entry-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class ProductEntryListComponent implements OnInit {
  component;

  constructor(
    customTitle: CustomTitleService,
    public _productEntryService: ProductEntryService,
    private _router: Router
  ) {
    customTitle.set("Compras");
  }

  ngOnInit(): void {
    this.component = componentSettings;
  }

  search(data: SearchFilter) {
    this.component.filters.numFilter = data.searchValue;
    this.component.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  searchDateRange(date: DateRange) {
    this.component.filters.startDate = date.startDate;
    this.component.filters.endDate = date.endDate;
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = "";

    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }

    if (
      this.component.filters.startDate != "" &&
      this.component.filters.endDate != ""
    ) {
      str += `&startDate=${this.component.filters.startDate}&endDate=${this.component.filters.endDate}`;
    }

    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
    }
    this.component.getInputs = str;
  }

  rowClick(rowClick: RowClick<ProductEntryResponse>) {
    let action = rowClick.action;
    let productEntry = rowClick.row;

    switch (action) {
      case "viewDetail":
        this.productEntryViewDetail(productEntry);
        break;
      case "cancel":
        this.productEntryCancel(productEntry);
    }
    return false;
  }

  productEntryViewDetail(productEntry: ProductEntryResponse) {
    this._router.navigate([
      "/proceso-compras/crear",
      productEntry.productEntryId,
    ]);
  }

  productEntryCancel(productEntryData: ProductEntryResponse) {
    Swal.fire({
      title: `Se anulará de forma permanente`,
      text: `¿Realmente deseas anular la Entrada de Producto?`,
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "rgb(210, 155, 253)",
      cancelButtonColor: "rgb(79, 109, 253)",
      confirmButtonText: "Sí, anular",
      cancelButtonText: "Cancelar",
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this._productEntryService
          .productEntryCancel(productEntryData.productEntryId)
          .subscribe(() => this.setGetInputsProductEntries(true));
      }
    });
  }

  setGetInputsProductEntries(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `ProductEntry?download=true`;
  }

  resetFilters() {
    this.component.filters = { ...this.component.resetFilters };
    this.formatGetInputs();
  }

  newProductEntry() {
    this._router.navigate(["/proceso-compras/crear"]);
  }
}
