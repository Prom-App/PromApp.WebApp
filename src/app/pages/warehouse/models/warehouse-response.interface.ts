export interface WarehouseResponse {
  warehouseId: number;
  name: string;
  auditCreateDate: Date;
  state: number;
  stateWarehouse: string;
  badgeColor: string;
  icEdit: {};
  icDelete: {};
}

export interface WarehouseById {
  warehouseId: number;
  name: string;
  state: number;
}
