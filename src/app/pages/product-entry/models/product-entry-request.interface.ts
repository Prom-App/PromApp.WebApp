export interface ProductEntryRequest {
  observation: string;
  subTotal: number;
  igv: number;
  totalAmount: number;
  warehouseId: number;
  providerId: number;
  productEntryDetails: ProductEntryDetailRequest[];
}

export interface ProductEntryDetailRequest {
  productId: number;
  quantity: number;
  unitPurchasePrice: number;
  total: number;
}
