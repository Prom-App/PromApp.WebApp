import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RowClick } from "@shared/models/row-click.interface";
import { SearchFilter } from "@shared/models/search-options.interface";
import { SelectAutocomplete } from "@shared/models/select-autocomplete.interface";
import { AlertService } from "@shared/services/alert.service";
import { ClientSelectService } from "@shared/services/client-select.service";
import { IconService } from "@shared/services/icon.service";
import { VoucherDocumentTypeSelectService } from "@shared/services/voucher-document-type-select.service";
import { WarehouseSelectService } from "@shared/services/warehouse-select.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { SaleRequest } from "../../models/sale-request.interface";
import { ProductDetailsResponse } from "../../models/sale-response.interface";
import { SaleDetailService } from "../../services/sale-detail.service";
import { SaleService } from "../../services/sale.service";
import { componentSettings } from "../sale-list/sale-list-config";

@Component({
  selector: "vex-sale-create",
  templateUrl: "./sale-create.component.html",
  styleUrls: ["./sale-create.component.scss"],
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class SaleCreateComponent implements OnInit {
  componentSaleDetail;

  icRemove = IconService.prototype.getIcon("icDelete");

  voucherDocumentTypeSelect: SelectAutocomplete[];
  clientSelect: SelectAutocomplete[];
  warehouseSelect: SelectAutocomplete[];
  numRecordsProducts: number = 4;

  cartDetails: any | ProductDetailsResponse[] = [];

  subtotal: number = 0;
  igv: number = 0;
  total: number = 0;

  form: FormGroup;

  saleId: number = 0;
  viewDetailRead: boolean = false;
  selectedWarehouseId: number;

  initForm(): void {
    this.form = this._fb.group({
      voucherDocumentTypeId: ["", Validators.required],
      voucherNumber: ["", Validators.required],
      clientId: ["", Validators.required],
      warehouseId: ["", Validators.required],
      observation: [""],
    });
  }

  constructor(
    private _fb: FormBuilder,
    private _voucherDocumentTypeSelectService: VoucherDocumentTypeSelectService,
    private _clientSelectService: ClientSelectService,
    private _warehouseSelectService: WarehouseSelectService,
    private _saleService: SaleService,
    public _saleDetailService: SaleDetailService,
    private _route: Router,
    private _alert: AlertService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.initForm();
    this._activatedRoute.params.subscribe((params) => {
      this.saleId = params["saleId"];
    });
  }

  ngOnInit(): void {
    this.listSelectVoucherDocumentTypes();
    this.listSelectClients();
    this.listSelectWarehouses();
    this.componentSaleDetail = componentSettings;
    this.calculateSubtotal();
    this.calculateIGV();
    this.calculateTotal();

    if (this.saleId > 0) {
      this.saleById(this.saleId);
      this.viewDetailRead = true;
    }
  }

  saleById(saleId: number) {
    this._saleService.saleById(saleId).subscribe((resp) => {
      this.listSelectVoucherDocumentTypes();
      this.listSelectClients();
      this.listSelectWarehouses();
      this.form.reset({
        voucherDocumentTypeId: resp.voucherDocumentTypeId,
        voucherNumber: resp.voucherNumber,
        clientId: resp.clientId,
        warehouseId: resp.warehouseId,
        observation: resp.observation,
      });
      this.cartDetails = resp.saleDetails;
      this.subtotal = resp.subTotal;
      this.igv = resp.igv;
      this.total = resp.totalAmount;
    });
  }

  onItemSelected(id: number): void {
    this.selectedWarehouseId = id;
    this.formatGetInputs();
    this.cartDetails = [];
  }

  listSelectVoucherDocumentTypes(): void {
    this._voucherDocumentTypeSelectService
      .listSelectVoucherDocumentTypes()
      .subscribe((resp) => {
        this.voucherDocumentTypeSelect = resp;
      });
  }

  listSelectClients(): void {
    this._clientSelectService.listSelectClients().subscribe((resp) => {
      this.clientSelect = resp;
    });
  }

  listSelectWarehouses(): void {
    this._warehouseSelectService.listSelectWarehouses().subscribe((resp) => {
      this.warehouseSelect = resp;
    });
  }

  search(data: SearchFilter) {
    this.componentSaleDetail.filters.numFilter = data.searchValue;
    this.componentSaleDetail.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = "";

    if (this.componentSaleDetail.filters.textFilter != null) {
      str += `&numFilter=${this.componentSaleDetail.filters.numFilter}&textFilter=${this.componentSaleDetail.filters.textFilter}`;
    }

    str += `&id=${this.selectedWarehouseId}`;

    this.componentSaleDetail.getInputs = str;
  }

  rowClick(rowClick: RowClick<ProductDetailsResponse>) {
    let action = rowClick.action;
    let products = rowClick.row;

    switch (action) {
      case "addDetail":
        this.addDetail(products);
        break;
    }
    return false;
  }

  addDetail = (products: ProductDetailsResponse) => {
    if (products.totalAmount <= 0) {
      return;
    }

    const productCopy = { ...products };
    const existingProduct = this.cartDetails.find(
      (item) => item.code === productCopy.code
    );

    const validateResult = existingProduct
      ? this.validateStock(existingProduct, productCopy.quantity)
      : this.validateStock(productCopy, null);

    if (validateResult) {
      this._alert.warn(
        "Stock Agotado",
        "La cantidad seleccionada supera el stock disponible"
      );
      return;
    }

    if (existingProduct) {
      existingProduct.quantity += productCopy.quantity;
      existingProduct.totalAmount =
        existingProduct.quantity * existingProduct.unitSalePrice;
    } else {
      this.cartDetails.push(productCopy);
    }

    this.calculateSubtotal();
    this.calculateIGV();
    this.calculateTotal();
  };

  validateStock(
    existingProduct: ProductDetailsResponse,
    quantityToAdd: number
  ): boolean {
    if (
      existingProduct.quantity + quantityToAdd >
      existingProduct.currentStock
    ) {
      return true;
    }
    return false;
  }

  calculateSubtotal() {
    this.subtotal = this.cartDetails.reduce(
      (acc, product) => acc + product.quantity * product.unitSalePrice,
      0
    );
  }

  calculateIGV() {
    this.igv = this.subtotal * 0.18;
  }

  calculateTotal() {
    this.total = this.subtotal + this.igv;
  }

  removeFromCart(product: ProductDetailsResponse) {
    const index = this.cartDetails.indexOf(product);
    if (index !== -1) {
      this.cartDetails.splice(index, 1);
    }
    this.calculateSubtotal();
    this.calculateIGV();
    this.calculateTotal();
  }

  back() {
    this._route.navigate(["proceso-ventas"]);
  }

  saleSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const sale: SaleRequest = {
      voucherNumber: this.form.value.voucherNumber,
      observation: this.form.value.observation,
      voucherDocumentTypeId: this.form.value.voucherDocumentTypeId,
      warehouseId: this.form.value.warehouseId,
      clientId: this.form.value.clientId,
      subTotal: this.subtotal,
      igv: this.igv,
      totalAmount: this.total,
      saleDetails: this.cartDetails.map((product) => {
        return {
          productId: product.productId,
          quantity: product.quantity,
          unitSalePrice: product.unitSalePrice,
          total: product.totalAmount,
        };
      }),
    };

    this._saleService.saleRegister(sale).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._route.navigate(["proceso-ventas"]);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }
}
