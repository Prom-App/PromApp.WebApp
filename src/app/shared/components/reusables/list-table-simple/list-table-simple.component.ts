import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from "@angular/material/form-field";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { TableColumnSimple } from "@shared/models/list-table-simple.interface";
import { getEsPaginatorIntl } from "@shared/paginator-intl/es-paginator-intl";
import { IconService } from "@shared/services/icon.service";
import { SharedModule } from "@shared/shared.module";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { scaleFadeIn400ms } from "src/@vex/animations/scale-fade-in.animation";

@Component({
  selector: "app-list-table-simple",
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: "./list-table-simple.component.html",
  styleUrls: ["./list-table-simple.component.scss"],
  animations: [scaleFadeIn400ms, fadeInUp400ms],
  // Para la traducción de nuestra tabla que por defecto está en español
  providers: [
    { provide: MatPaginatorIntl, useValue: getEsPaginatorIntl() },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "standard" } as MatFormFieldDefaultOptions,
    },
  ],
})
export class ListTableSimpleComponent<T> implements OnInit, AfterViewInit
{
  // Define propiedades de entrada y salida
  @Input() columns: TableColumnSimple<T>[];
  @Input() data: any;
  @Output() rowClick = new EventEmitter<T>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Define propiedades internas
  dataSource: MatTableDataSource<T>;
  visibleColumns: Array<keyof T | string>;

  // Voy a configurar también los parámetros para mi paginación
  paginatorOptions = {
    pageSizeOptions: [10, 20, 50],
    pageSize: 10,
    pageLength: 0,
  };

  icSearch = IconService.prototype.getIcon("icSearch");

  constructor() {}

  ngOnInit(): void {
    if (this.data) {
      // Filtra las columnas visibles y obtiene sus propiedades
      this.visibleColumns = this.columns
        .filter((column) => column.visible)
        .map((column) => column.property);

        // Crea una fuente de datos para la tabla
      this.dataSource = new MatTableDataSource(this.data);
    }
  }

  // Método que se ejecuta después de inicializar la vista
  ngAfterViewInit() {
    // Asigna el paginador a la fuente de datos
    this.dataSource.paginator = this.paginator;
  }

  // Método para aplicar un filtro a los datos de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
