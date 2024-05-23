export interface TableColumnSimple<T> {
  label: string;
  // subLabel?: string;
  cssLabel?: string[];
  // cssSubLabel?: string[];
  property: keyof T | string;
  cssProperty: string[];
  // subProperty?: keyof T | string;
  // cssSubProperty?: string[];
  // footer?: string | number;
  type:
    | "text"
    | "number"
    | "currency"
  // action?: string;
  visible?: boolean;
  // sticky?: boolean;
  // stickyEnd?: boolean;
}
