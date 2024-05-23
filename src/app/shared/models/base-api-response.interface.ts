export interface BaseApiResponse {
  isSuccess: boolean;
  data: any;
  totalRecords: number;
  message: any;
  errors: any;
}