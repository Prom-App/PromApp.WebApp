export interface SearchOptions {
  label: string;
  value: number;
  placeholder: string;
  validation: any;
  validation_desc: string;
  icon: string;
  min_length?: number;
}

export interface SearchFilter {
  searchValue: number;
  searchData: string;
  stateFilter: number;
}

export interface DateRange {
  startDate: any;
  endDate: any;
}