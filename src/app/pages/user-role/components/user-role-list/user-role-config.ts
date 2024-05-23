import { TableColumns } from "@shared/models/list-table.interface";
import { MenuItems } from "@shared/models/menu-items.interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { IconService } from "@shared/services/icon.service";
import { GenericValidators } from "@shared/validators/generic-validators";
import { UserRoleResponse } from "../../models/user-role-response.interface";

const searchOptions: SearchOptions[] = [
  {
    label: "Usuario",
    value: 1,
    placeholder: "Buscar por Usuario",
    validation: [GenericValidators.alphanumeric],
    validation_desc: "Solo se permite letras y/o números en esta búsqueda.",
    icon: "icUser",
  },
  {
    label: "Rol",
    value: 2,
    placeholder: "Buscar por Rol",
    validation: [GenericValidators.alphanumeric],
    validation_desc: "Solo se permite letras y/o números en esta búsqueda.",
    icon: "icRole",
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

const tableColumns: TableColumns<UserRoleResponse>[] = [
  {
    label: "USUARIO",
    cssLabel: ["font-bold", "text-sm"],
    property: "user",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: true,
    sort: true,
    sortProperty: "user",
    visible: true,
    download: true,
  },
  {
    label: "ROL",
    cssLabel: ["font-bold", "text-sm"],
    property: "role",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: true,
    sort: true,
    sortProperty: "role",
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
    property: "stateUserRole",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "badge",
    sticky: false,
    sort: false,
    visible: true,
    download: true,
    property_download: "stateUserRole",
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
  icUserRole: IconService.prototype.getIcon("icUserRole"),
  tableColumns,
  initialSort: "Id",
  initialSortDir: "desc",
  getInputs,
  menuItems,
  searchOptions,
  filters,
  resetFilters,
  filename: "lista-de-roles-de-usuarios",
};
