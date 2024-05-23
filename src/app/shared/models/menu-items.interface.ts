import { Icon } from "@visurel/iconify-angular";

export interface MenuItems {
  type: "link";
  id?: "all" | "Activo" | "Inactivo";
  icon?: Icon;
  label: string;
  searchValue?: number;
  class?: {
    icon?: string;
  };
  size?: string;
}