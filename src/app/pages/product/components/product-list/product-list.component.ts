import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
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
import { ProductResponse } from "../../models/product-response.interface";
import { ProductService } from "../../services/product.service";
import { ProductManageComponent } from "../product-manage/product-manage.component";
import { componentSettings } from "./product-list-config";
import { ProductStockWarehouseComponent } from "../product-stock-warehouse/product-stock-warehouse.component";

@Component({
  selector: "vex-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class ProductListComponent implements OnInit {
  component;

  constructor(
    customTitle: CustomTitleService,
    public _productService: ProductService,
    private _dialog: MatDialog
  ) {
    customTitle.set("Productos");
  }

  ngOnInit(): void {
    this.component = componentSettings;
  }

  setMenu(value: number) {
    this.component.filters.stateFilter = value;
    this.formatGetInputs();
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

    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }

    if (
      this.component.filters.startDate != "" &&
      this.component.filters.endDate != ""
    ) {
      str += `&startDate=${this.component.filters.startDate}&endDate=${this.component.filters.endDate}`;
    }
    // Si refresh en filters es true||||,
    //vamos a generar un número aleatorio||||,
    //agregamos a la cadena junto con "refresh"||||
    //y vamos a establecer refresh como false.||||
    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
    }

    // para que finalmente formatear los valores en filters y asignarlos a getInputs.
    this.component.getInputs = str;
  }

  openDialogRegister() {
    this._dialog
      .open(ProductManageComponent, {
        disableClose: true,
        width: "400px",
        data: { mode: "register" },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          // Aquí llamamos a setGetInputsProviders(true) para establecer refresh en filters como verdadero y llamar a formatGetInputs() para actualizar getInputs.
          this.setGetInputsProducts(true);
        }
      });
  }

  rowClick(rowClick: RowClick<ProductResponse>) {
    let action = rowClick.action;
    let product = rowClick.row;

    switch (action) {
      case "edit":
        this.productEdit(product);
        break;
      case "remove":
        this.productRemove(product);
        break;
      case "view":
        this.productInfoWarehouse(product);
        break;
    }
    return false;
  }

  productEdit(productData: ProductResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = productData;

    this._dialog
      .open(ProductManageComponent, {
        data: { dialogConfig, mode: "edit" },
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsProducts(true);
        }
      });
  }

  productRemove(productData: ProductResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el producto ${productData.name}?`,
      text: "Se borrará de forma permanente!",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "rgb(210, 155, 253)",
      cancelButtonColor: "rgb(79, 109, 253)",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this._productService
          .productRemove(productData.productId)
          .subscribe(() => this.setGetInputsProducts(true));
      }
    });
  }

  productInfoWarehouse(productData: ProductResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = productData;
    this._dialog.open(ProductStockWarehouseComponent, {
      data: { dialogConfig },
    });
  }

  setGetInputsProducts(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Product?download=true`;
  }

  resetFilters() {
    this.component.filters = { ...this.component.resetFilters };
    this.formatGetInputs();
  }
}
