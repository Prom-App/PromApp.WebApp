export interface ProductEntryResponse {
  productEntryId: number;
  voucherDescription: string;
  voucherNumber: string;
  provider: string;
  warehouse: string;
  totalAmount: number;
  dateOfPurchase: Date;
  // badgeColor: string;
  icView: object;
  icCancel: object;
}

export interface ProductDetailsResponse {
  productId: number;
  image: string;
  code: string;
  name: string;
  quantity: number;
  unitPurchasePrice: number;
  totalAmount: number;
  icAdd: object;
}

export interface ProductEntryByIdResponseDto {
  productEntryId: number;
  voucherNumber: string;
  observation: string;
  subTotal: number;
  igv: number;
  totalAmount: number;
  voucherDocumentTypeId: number;
  warehouseId: number;
  providerId: number;
  productEntryDetails: ProductEntryDetailByIdResponseDto[];
}

export interface ProductEntryDetailByIdResponseDto {
  productId: number;
  quantity: number;
  unitPurchasePrice: number;
  total: number;
}
