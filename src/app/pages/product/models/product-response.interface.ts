export interface ProductResponse {
  productId: number;
  code: string;
  name: string;
  stockMin: number;
  stockMax: string;
  image: string;
  unitSalePrice: number;
  category: string;
  auditCreateDate: Date;
  state: number;
  stateProduct: string;
  badgeColor: string;
  icView: object;
  icEdit: object;
  icDelete: object;
}

export interface ProductById {
  productId: number;
  code: string;
  name: string;
  stockMin: number;
  stockMax: number;
  image: File;
  unitSalePrice: number;
  categoryId: number;
  state: number;
}
