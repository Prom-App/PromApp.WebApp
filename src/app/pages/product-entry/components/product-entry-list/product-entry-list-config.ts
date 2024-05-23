import { TableColumns } from "@shared/models/list-table.interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { IconService } from "@shared/services/icon.service";
import { GenericValidators } from "@shared/validators/generic-validators";
import {
  ProductDetailsResponse,
  ProductEntryResponse,
} from "../../models/product-entry-response.interface";

const searchOptions: SearchOptions[] = [
  {
    label: "Proveedor",
    value: 1,
    placeholder: "Buscar por Proveedor",
    validation: [GenericValidators.alphanumeric],
    validation_desc: "Solo se permite letras y números en esta búsqueda.",
    icon: "icName",
  },
];

const searchOptionsProducts: SearchOptions[] = [
  {
    label: "Código",
    value: 1,
    placeholder: "Buscar por Código",
    validation: [GenericValidators.alphanumeric],
    validation_desc: "Solo se permite letras y/o números en esta búsqueda.",
    icon: "icName",
  },
  {
    label: "Nombre",
    value: 2,
    placeholder: "Buscar por Nombre",
    validation: [GenericValidators.defaultName],
    validation_desc: "Solo se permite letras en esta búsqueda.",
    icon: "icName",
  },
];

const tableColumns: TableColumns<ProductEntryResponse>[] = [
  {
    label: "PROVEEDOR",
    cssLabel: ["font-bold", "text-sm"],
    property: "provider",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "textUppercase",
    sticky: true,
    sort: true,
    sortProperty: "provider",
    visible: true,
    download: true,
  },
  {
    label: "ALMACÉN",
    cssLabel: ["font-bold", "text-sm"],
    property: "warehouse",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: true,
    sort: true,
    sortProperty: "warehouse",
    visible: true,
    download: true,
  },
  {
    label: "MONTO TOTAL",
    cssLabel: ["font-bold", "text-sm"],
    property: "totalAmount",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "currency",
    sticky: true,
    sort: true,
    sortProperty: "totalAmount",
    visible: true,
    download: true,
  },
  {
    label: "F. DE COMPRA",
    cssLabel: ["font-bold", "text-sm"],
    property: "dateOfPurchase",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "datetime",
    sticky: false,
    sort: true,
    visible: true,
    download: true,
  },
  {
    label: "",
    cssLabel: [],
    property: "icView",
    cssProperty: [],
    type: "icon",
    action: "viewDetail",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
  {
    label: "",
    cssLabel: [],
    property: "icCancel",
    cssProperty: [],
    type: "icon",
    action: "cancel",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
];

const tableColumnsProducts: TableColumns<ProductDetailsResponse>[] = [
  {
    label: "",
    cssLabel: ["font-bold", "text-xxs"],
    property: "image",
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "image",
    sticky: false,
    sort: true,
    sortProperty: "image",
    visible: true,
    download: true,
  },
  {
    label: "CÓDIGO",
    cssLabel: ["font-bold", "text-xxs"],
    property: "code",
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "textUppercase",
    sticky: false,
    sort: true,
    sortProperty: "code",
    visible: true,
    download: true,
  },
  {
    label: "NOMBRE",
    cssLabel: ["font-bold", "text-xxs"],
    property: "name",
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    subProperty: "category",
    cssSubProperty: ["text-xxs", "text-am-gray", "uppercase", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "name",
    visible: true,
    download: true,
  },
  {
    label: "CANTIDAD",
    cssLabel: ["font-bold", "text-xxs"],
    property: "quantity",
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "quantityPurchase",
    sticky: false,
    sort: true,
    visible: true,
  },
  {
    label: "PRECIO U.",
    cssLabel: ["font-bold", "text-xxs"],
    property: "unitPurchasePrice",
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "unitPurchasePrice",
    sticky: false,
    sort: true,
    visible: true,
  },
  {
    label: "TOTAL",
    cssLabel: ["font-bold", "text-xxs"],
    property: "totalAmount",
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "totalAmount",
    sticky: false,
    sort: true,
    visible: true,
  },
  {
    label: "",
    cssLabel: [],
    property: "icAdd",
    cssProperty: [],
    type: "icon",
    action: "addDetail",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
];

const filters = {
  numFilter: 0,
  textFilter: "",
  startDate: "",
  endDate: "",
  refresh: false,
};

const resetFilters = {
  numFilter: 0,
  textFilter: "",
  startDate: "",
  endDate: "",
  refresh: false,
};

let getInputs: string = "";

export const componentSettings = {
  icProductEntry: IconService.prototype.getIcon("icSales"),
  tableColumns,
  tableColumnsProducts,
  initialSort: "Id",
  initialSortDir: "desc",
  getInputs,
  searchOptions,
  searchOptionsProducts,
  filters,
  resetFilters,
  filename: "lista-de-compras",
};
