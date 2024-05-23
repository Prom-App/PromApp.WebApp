import { Component, Inject, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { componentInit } from "./product-stock-warehouse-config";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProductStockWarehouseResponse } from "../../models/product-stock-warehouse-response.interface";
import { IconService } from "@shared/services/icon.service";

@Component({
  selector: "vex-product-stock-warehouse",
  templateUrl: "./product-stock-warehouse.component.html",
  styleUrls: ["./product-stock-warehouse.component.scss"],
})
export class ProductStockWarehouseComponent implements OnInit {
  // Define propiedades del componente
  component;
  productStockByWarehouses: ProductStockWarehouseResponse[];
  codeProduct: string;
  nameProduct: string;
  icClose = IconService.prototype.getIcon("icClose");

  constructor(
    // Recibe datos a través 
    // de MAT_DIALOG_DATA y ProductService
    @Inject(MAT_DIALOG_DATA) public data,
    private _productService: ProductService
  ) {
    // Inicializa las propiedades codeProduct y nameProduct 
    // con datos recibidos (data)
    this.codeProduct = this.data.dialogConfig.data.code;
    this.nameProduct = this.data.dialogConfig.data.name;
  }

  ngOnInit(): void {
    // Inicializa la propiedad 'component' 
    // con un objeto clonado de 'componentInit'
    this.component = { ...componentInit };
    // Llama al método para obtener el stock del producto por almacén
    this.productStockByWarehouse(this.data.dialogConfig.data.productId);
  }

  // Método para obtener el stock del producto por almacén
  productStockByWarehouse(productId: number) {
    this._productService
      .productStockByWarehouse(productId)
      .subscribe((resp: ProductStockWarehouseResponse[]) => {
        // Asigna la respuesta a la propiedad 'productStockByWarehouses'
        this.productStockByWarehouses = resp;
      });
  }
}
