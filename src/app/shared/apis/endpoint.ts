import { HttpHeaders } from "@angular/common/http";

export const endpoint = {
  // CATEGORY MODULE
  LIST_CATEGORIES: "Category",
  LIST_SELECT_CATEGORIES: "Category/Select",
  CATEGORY_BY_ID: "Category/",
  CATEGORY_REGISTER: "Category/Register/",
  CATEGORY_EDIT: "Category/Edit/",
  CATEGORY_REMOVE: "Category/Remove/",

  // AUTH MODULE
  LOGIN: "usuario/autenticar",
  LOGIN_GOOGLE: "usuario/autenticarGoogle",
  REGISTER: 'usuario/registrar',

  // TEST MODULE
  TEST_BY_NAME:'test/',
  SAVE_TEST: 'test/guardarTest',

  // ACCOUNT MODULE
  UPDATE_USER:'usuario/actualizarUsuario',

  // SHARED MODULE
  AVATAR_LIST:'avatar/listar',
  CITY_LIST:'ciudad/listar',
  COUNTRY_LIST:'pais/listar',
  COUNTRY:'pais/',
  GENDER_LIST:'genero/listar',
  NATIONALITY_LIST:'nacionalidad/listar',
  STATE_LIST:'departamento/listar',
  STATE:'departamento/',

  // PROVIDER MODULE
  LIST_PROVIDERS: "Provider",
  LIST_SELECT_PROVIDERS: "Provider/Select",
  PROVIDER_BY_ID: "Provider/",
  PROVIDER_REGISTER: "Provider/Register/",
  PROVIDER_EDIT: "Provider/Edit/",
  PROVIDER_REMOVE: "Provider/Remove/",

  // DOCUMENT_TYPE MODULE
  LIST_DOCUMENT_TYPES: "DocumentType",

  //PRODUCT MODULE
  LIST_PRODUCTS: "Product",
  PRODUCT_BY_ID: "Product/",
  PRODUCT_REGISTER: "Product/Register/",
  PRODUCT_EDIT: "Product/Edit/",
  PRODUCT_REMOVE: "Product/Remove/",
  PRODUCT_STOCK_WAREHOUSE: "ProductStock/ProductStockByWarehouse/",

  // WAREHOUSE MODULE
  LIST_WAREHOUSES: "Warehouse",
  LIST_SELECT_WAREHOUSES: "Warehouse/Select",
  WAREHOUSE_BY_ID: "Warehouse/",
  WAREHOUSE_REGISTER: "Warehouse/Register/",
  WAREHOUSE_EDIT: "Warehouse/Edit/",
  WAREHOUSE_REMOVE: "Warehouse/Remove/",

  // PRODUCT ENTRY MODULE
  LIST_PRODUCT_ENTRIES: "ProductEntry",
  PRODUCT_ENTRY_BY_ID: "ProductEntry/",
  PRODUCT_ENTRY_REGISTER: "ProductEntry/Register/",
  PRODUCT_ENTRY_CANCEL: "ProductEntry/Cancel/",

  // VOUCHER DOCUMENT TYPE MODULE
  LIST_SELECT_VOUCHER_DOCUMENT_TYPE: "VoucherDocumentType/Select",

  // CLIENT MODULE
  LIST_CLIENTS: "Client",
  LIST_SELECT_CLIENTS: "Client/Select",
  CLIENT_BY_ID: "Client/",
  CLIENT_REGISTER: "Client/Register/",
  CLIENT_EDIT: "Client/Edit/",
  CLIENT_REMOVE: "Client/Remove/",

  // SALE MODULE
  LIST_SALES: "Sale",
  SALE_BY_ID: "Sale/",
  SALE_REGISTER: "Sale/Register/",
  SALE_CANCEL: "Sale/Cancel/",
  PRODUCT_STOCK_WAREHOUSE_ID: "Sale/ProductStockByWarehouse",
  EXPORT_PDF_SALE_DETAIL: "Sale/ExportToPdfSaleDetail/",

  // MENU MODULE
  MENU_BY_ROLE: "Menu/MenuByRole",

  // USER MODULE
  LIST_USERS: "User",
  LIST_SELECT_USERS: "User/Select",
  USER_BY_ID: "User/",
  USER_REGISTER: "User/Register/",
  USER_EDIT: "User/Edit/",
  USER_REMOVE: "User/Remove/",

  // ROLE MODULE
  LIST_ROLES: "Role",
  LIST_SELECT_ROLES: "Role/Select",
  ROLE_BY_ID: "Role/",
  ROLE_REGISTER: "Role/Register/",
  ROLE_EDIT: "Role/Edit/",
  ROLE_REMOVE: "Role/Remove/",
  PERMISSION_BY_ROLE_ID: "Permission/PermissionByRoleId/",

  // USER ROLE MODULE
  LIST_USER_ROLES: "UserRole",
  USER_ROLE_BY_ID: "UserRole/",
  USER_ROLE_REGISTER: "UserRole/Register/",
  USER_ROLE_EDIT: "UserRole/Edit/",
  USER_ROLE_REMOVE: "UserRole/Remove/",
};

// Aquí voy a agregar una configuración extra||||
export const httpOptions = {
  // para que simplemente pasemos en nuestro encabezado el valor del content Type||||
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
