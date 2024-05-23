export interface SaleResponse {
  saleId: number;
  voucherDescription: string;
  voucherNumber: string;
  client: string;
  warehouse: string;
  totalAmount: number;
  dateOfSale: Date;
  badgeColor: string;
  icView: object;
  icInvoice: object;
  icCancel: object;
}

export interface ProductDetailsResponse {
  productId: number;
  image: string;
  code: string;
  name: string;
  quantity: number;
  unitSalePrice: number;
  currentStock: number;
  totalAmount: number;
  icAdd: object;
}

export interface SaleByIdResponseDto {
  saleId: number;
  voucherNumber: string;
  observation: string;
  subTotal: number;
  igv: number;
  totalAmount: number;
  voucherDocumentTypeId: number;
  warehouseId: number;
  clientId: number;
  saleDetails: SaleDetailByIdResponseDto[];
}

export interface SaleDetailByIdResponseDto {
  productId: number;
  quantity: number;
  unitSalePrice: number;
  total: number;
}
