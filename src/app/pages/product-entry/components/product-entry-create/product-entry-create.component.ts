import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RowClick } from "@shared/models/row-click.interface";
import { SearchFilter } from "@shared/models/search-options.interface";
import { SelectAutocomplete } from "@shared/models/select-autocomplete.interface";
import { AlertService } from "@shared/services/alert.service";
import { IconService } from "@shared/services/icon.service";
import { ProviderSelectService } from "@shared/services/provider-select.service";
import { VoucherDocumentTypeSelectService } from "@shared/services/voucher-document-type-select.service";
import { WarehouseSelectService } from "@shared/services/warehouse-select.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { ProductEntryRequest } from "../../models/product-entry-request.interface";
import {
  ProductDetailsResponse,
  ProductEntryDetailByIdResponseDto,
} from "../../models/product-entry-response.interface";
import { ProductEntryDetailService } from "../../services/product-entry-detail.service";
import { ProductEntryService } from "../../services/product-entry.service";
import { componentSettings } from "../product-entry-list/product-entry-list-config";

@Component({
  selector: "vex-product-entry-create",
  templateUrl: "./product-entry-create.component.html",
  styleUrls: ["./product-entry-create.component.scss"],
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class ProductEntryCreateComponent implements OnInit {
  componentProductEntryDetail;

  icRemove = IconService.prototype.getIcon("icDelete");

  voucherDocumentTypeSelect: SelectAutocomplete[];
  providerSelect: SelectAutocomplete[];
  warehouseSelect: SelectAutocomplete[];
  numRecordsProducts: number = 4;

  cartDetails: any | ProductDetailsResponse[] = [];

  subtotal: number = 0;
  igv: number = 0;
  total: number = 0;

  form: FormGroup;

  productEntryId: number = 0;
  viewDetailRead: boolean = false;

  initForm(): void {
    this.form = this._fb.group({
      providerId: ["", Validators.required],
      warehouseId: ["", Validators.required],
      observation: [""],
    });
  }

  constructor(
    private _fb: FormBuilder,
    // private _voucherDocumentTypeSelectService: VoucherDocumentTypeSelectService,
    private _providerSelectService: ProviderSelectService,
    private _warehouseSelectService: WarehouseSelectService,
    private _productEntryService: ProductEntryService,
    public _productEntryDetailService: ProductEntryDetailService,
    private _route: Router,
    private _alert: AlertService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.initForm();
    this._activatedRoute.params.subscribe((params) => {
      this.productEntryId = params["productEntryId"];
    });
  }

  ngOnInit(): void {
    // this.listSelectVoucherDocumentTypes();
    this.listSelectProviders();
    this.listSelectWarehouses();
    this.componentProductEntryDetail = componentSettings;
    this.calculateSubtotal();
    this.calculateIGV();
    this.calculateTotal();

    if (this.productEntryId > 0) {
      this.productEntryById(this.productEntryId);
      this.viewDetailRead = true;
    }
  }

  productEntryById(productEntryId: number) {
    this._productEntryService
      .productEntryById(productEntryId)
      .subscribe((resp) => {
        // this.listSelectVoucherDocumentTypes();
        this.listSelectProviders();
        this.listSelectWarehouses();
        this.form.reset({
          providerId: resp.providerId,
          warehouseId: resp.warehouseId,
          observation: resp.observation,
        });
        this.cartDetails = resp.productEntryDetails;
        this.subtotal = resp.subTotal;
        this.igv = resp.igv;
        this.total = resp.totalAmount;
      });
  }

  // listSelectVoucherDocumentTypes(): void {
  //   this._voucherDocumentTypeSelectService
  //     .listSelectVoucherDocumentTypes()
  //     .subscribe((resp) => {
  //       this.voucherDocumentTypeSelect = resp;
  //     });
  // }

  listSelectProviders(): void {
    this._providerSelectService.listSelectProviders().subscribe((resp) => {
      this.providerSelect = resp;
    });
  }

  listSelectWarehouses(): void {
    this._warehouseSelectService.listSelectWarehouses().subscribe((resp) => {
      this.warehouseSelect = resp;
    });
  }

  search(data: SearchFilter) {
    this.componentProductEntryDetail.filters.numFilter = data.searchValue;
    this.componentProductEntryDetail.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = "";

    if (this.componentProductEntryDetail.filters.textFilter != null) {
      str += `&numFilter=${this.componentProductEntryDetail.filters.numFilter}&textFilter=${this.componentProductEntryDetail.filters.textFilter}`;
    }

    this.componentProductEntryDetail.getInputs = str;
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

  addDetail(products: ProductDetailsResponse) {
    // Verifica si el monto total de productos es menor o igual a cero
    if (products.totalAmount <= 0) {
      return; // Si es así, no hace nada y sale de la función
    }

    // Copia los detalles de los productos para evitar modificar el objeto original
    const productCopy = { ...products };

    // Busca si ya existe un producto similar en el carrito para actualizar los datos
    const existingProduct = this.cartDetails.find(
      (item) => item.code === productCopy.code
    );

     // Si el producto ya existe en el carrito, actualiza la cantidad y el monto total
    if (existingProduct) {
      existingProduct.quantity += productCopy.quantity;
      existingProduct.totalAmount =
        existingProduct.quantity * existingProduct.unitPurchasePrice;
    } else {
      // Si el producto no existe en el carrito, lo agrega al carrito
      this.cartDetails.push(productCopy);
    }

    // Calcula los totales después de agregar o actualizar un producto
    this.calculateSubtotal();
    this.calculateIGV();
    this.calculateTotal();
  }

  // Calcula el subtotal sumando los montos totales de todos los productos en el carrito
  calculateSubtotal() {
    this.subtotal = this.cartDetails.reduce(
      (acc, product) => acc + product.quantity * product.unitPurchasePrice,
      0
    );
  }

  // Calcula el IGV (Impuesto General a las Ventas) basado en el subtotal
  calculateIGV() {
    this.igv = this.subtotal * 0.18; // Supone una tasa fija del 18% para el IGV
  }

  // Calcula el total sumando el subtotal y el IGV
  calculateTotal() {
    this.total = this.subtotal + this.igv;
  }

  removeFromCart(product: ProductDetailsResponse) {
    // Busca el índice del producto en el carrito
    const index = this.cartDetails.indexOf(product);

    // Verifica si el producto está en el carrito (índice distinto de -1)
    if (index !== -1) {
      // Si el producto está en el carrito, lo elimina del array
      this.cartDetails.splice(index, 1);
    }
    
     // Calcula los totales después de eliminar un producto
    this.calculateSubtotal();
    this.calculateIGV();
    this.calculateTotal();
  }

  back() {
    this._route.navigate(["proceso-compras"]);
  }

  productEntrySave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const productEntry: ProductEntryRequest = {
      observation: this.form.value.observation,
      warehouseId: this.form.value.warehouseId,
      providerId: this.form.value.providerId,
      subTotal: this.subtotal,
      igv: this.igv,
      totalAmount: this.total,
      productEntryDetails: this.cartDetails.map((product) => {
        return {
          productId: product.productId,
          quantity: product.quantity,
          unitPurchasePrice: product.unitPurchasePrice,
          total: product.totalAmount,
        };
      }),
    };

    this._productEntryService
      .productEntryRegister(productEntry)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._route.navigate(["proceso-compras"]);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }
}
