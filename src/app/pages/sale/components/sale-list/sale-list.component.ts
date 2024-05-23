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
import { SaleResponse } from "../../models/sale-response.interface";
import { SaleService } from "../../services/sale.service";
import { componentSettings } from "./sale-list-config";

@Component({
  selector: "vex-sale-list",
  templateUrl: "./sale-list.component.html",
  styleUrls: ["./sale-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class SaleListComponent implements OnInit {
  component;

  constructor(
    customTitle: CustomTitleService,
    public _saleService: SaleService,
    private _router: Router
  ) {
    customTitle.set("Ventas");
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

  rowClick(rowClick: RowClick<SaleResponse>) {
    let action = rowClick.action;
    let sale = rowClick.row;

    switch (action) {
      case "viewDetail":
        this.saleViewDetail(sale);
        break;
      case "cancel":
        this.saleCancel(sale);
        break;
      case "exportInvoice":
        this.saleExportToPdfSaleDetail(sale);
        break;
    }
    return false;
  }

  saleViewDetail(sale: SaleResponse) {
    this._router.navigate(["/proceso-ventas/crear", sale.saleId]);
  }

  saleCancel(saleData: SaleResponse) {
    Swal.fire({
      title: `Se anulará de forma permanente`,
      text: `¿Realmente deseas anular la Venta con N° Comprobante ${saleData.voucherNumber}?`,
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
        this._saleService
          .saleCancel(saleData.saleId)
          .subscribe(() => this.setGetInputsSales(true));
      }
    });
  }

  setGetInputsSales(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Sale?download=true`;
  }

  resetFilters() {
    this.component.filters = { ...this.component.resetFilters };
    this.formatGetInputs();
  }

  newSale() {
    this.setGetInputsSales(true);
    this._router.navigate(["/proceso-ventas/crear"]);
  }

  saleExportToPdfSaleDetail(saleData: SaleResponse) {
    this._saleService
      .saleExportToPdfSaleDetail(saleData.saleId)
      .subscribe((response) => {
        const blob = new Blob([response], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
  }
}
