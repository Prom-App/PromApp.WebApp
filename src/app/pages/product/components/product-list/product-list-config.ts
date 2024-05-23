import { TableColumns } from "@shared/models/list-table.interface";
import { MenuItems } from "@shared/models/menu-items.interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { IconService } from "@shared/services/icon.service";
import { GenericValidators } from "@shared/validators/generic-validators";
import { ProductResponse } from "../../models/product-response.interface";

const searchOptions: SearchOptions[] = [
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

const menuItems: MenuItems[] = [
  {
    type: "link",
    id: "all",
    searchValue: null,
    icon: IconService.prototype.getIcon("icViewHeadline"),
    label: "Todos",
  },
  {
    type: "link",
    id: "Activo",
    searchValue: 1,
    icon: IconService.prototype.getIcon("icLabel"),
    label: "Activo",
    class: {
      icon: "text-green",
    },
  },
  {
    type: "link",
    id: "Inactivo",
    searchValue: 0,
    icon: IconService.prototype.getIcon("icLabel"),
    label: "Inactivo",
    class: {
      icon: "text-gray",
    },
  },
];

const tableColumns: TableColumns<ProductResponse>[] = [
  {
    label: "",
    cssLabel: ["font-bold", "text-sm"],
    property: "image",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "image",
    sticky: true,
    sort: true,
    sortProperty: "image",
    visible: true,
    download: true,
  },
  {
    label: "CÓDIGO",
    cssLabel: ["font-bold", "text-sm"],
    property: "code",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "textUppercase",
    sticky: true,
    sort: true,
    sortProperty: "code",
    visible: true,
    download: true,
  },
  {
    label: "NOMBRE",
    cssLabel: ["font-bold", "text-sm"],
    property: "name",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    subProperty: "category",
    cssSubProperty: ["text-xxs", "text-am-gray", "uppercase", "text-left"],
    type: "text",
    sticky: true,
    sort: true,
    sortProperty: "name",
    visible: true,
    download: true,
  },
  {
    label: "STOCK MIN.",
    cssLabel: ["font-bold", "text-sm"],
    property: "stockMin",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "number",
    sticky: false,
    sort: true,
    sortProperty: "stockMin",
    visible: true,
    download: true,
  },
  {
    label: "STOCK MAX.",
    cssLabel: ["font-bold", "text-sm"],
    property: "stockMax",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "number",
    sticky: false,
    sort: true,
    sortProperty: "stockMax",
    visible: true,
    download: true,
  },
  {
    label: "PRECIO VENTA",
    cssLabel: ["font-bold", "text-sm"],
    property: "unitSalePrice",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "currency",
    sticky: false,
    sort: true,
    sortProperty: "unitSalePrice",
    visible: true,
    download: true,
  },
  {
    label: "F. DE CREACIÓN",
    cssLabel: ["font-bold", "text-sm"],
    property: "auditCreateDate",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "datetime",
    sticky: false,
    sort: true,
    visible: true,
    download: true,
  },
  {
    label: "ESTADO",
    cssLabel: ["font-bold", "text-sm"],
    property: "stateProduct",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "badge",
    sticky: false,
    sort: false,
    visible: true,
    download: true,
    property_download: "stateProduct",
  },
  {
    label: "",
    cssLabel: [],
    property: "icView",
    cssProperty: [],
    type: "icon",
    action: "view",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
  {
    label: "",
    cssLabel: [],
    property: "icEdit",
    cssProperty: [],
    type: "icon",
    action: "edit",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
  {
    label: "",
    cssLabel: [],
    property: "icDelete",
    cssProperty: [],
    type: "icon",
    action: "remove",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
];

const filters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  startDate: "",
  endDate: "",
  refresh: false,
};

const resetFilters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  startDate: "",
  endDate: "",
  refresh: false,
};

let getInputs: string = "";

export const componentSettings = {
  icProduct: IconService.prototype.getIcon("icProduct"),
  tableColumns,
  initialSort: "Id",
  initialSortDir: "desc",
  getInputs,
  menuItems,
  searchOptions,
  filters,
  resetFilters,
  filename: "lista-de-productos",
};
