export interface ProviderResponse {
  providerId: number;
  name: string;
  email: string;
  documentType: string;
  documentNumber: string;
  address: string;
  phone: string;
  auditCreateDate: Date;
  state: number;
  stateProvider: string;
  badgeColor: string;
  icEdit: any;
  icDelete: any;
}

export interface ProviderById {
  providerId: number;
  name: string;
  email: string;
  documentTypeId: number;
  documentNumber: string;
  address: string;
  phone: string;
  state: number;
}
