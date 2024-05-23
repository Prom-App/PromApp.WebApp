import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  MatFormFieldDefaultOptions,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { TableColumns, TableFooter } from "@shared/models/list-table.interface";
import { getEsPaginatorIntl } from "@shared/paginator-intl/es-paginator-intl";
import { AlertService } from "@shared/services/alert.service";
import { DefaultService } from "@shared/services/default.service";
import { IconService } from "@shared/services/icon.service";
import { SharedModule } from "@shared/shared.module";
import { IconModule } from "@visurel/iconify-angular";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { startWith, switchMap } from "rxjs/operators";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { scaleFadeIn400ms } from "src/@vex/animations/scale-fade-in.animation";

@Component({
  selector: "app-list-table",
  standalone: true,
  // Aquí vamos a importar todos los módulos necesarios directamente a nuestros componentes de tipo independiente o standalone
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    IconModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
  ],
  templateUrl: "./list-table.component.html",
  styleUrls: ["./list-table.component.scss"],
  // Aquí podemos importar algunas animaciones|||| que ya son existentes en nuestra plantilla para nuestra tabla también
  animations: [scaleFadeIn400ms, fadeInUp400ms],
  // Aquí podemos cargar algunos providers por ejemplo|||| para la traducción de nuestra tabla que por defecto está en español
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: getEsPaginatorIntl(),
    },
    // También podemos cargar aquí nuestra configuración por defecto||||, y también el tipo de apariencia
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "standard" } as MatFormFieldDefaultOptions,
    },
  ],
})

// Aquí marcamos nuestra clase como genérica|||| y luego vamos a agregar algunos ciclos de vida, primero el OnInit||||
// OnInit (ngOnInit()): Ésto es un ciclo de vida que se invoca después de que Angular haya inicializado todas las propiedades vinculadas a datos de una directiva||||
// AfterViewInit (ngAfterViewInit()): Esto también es un ciclo de vida que se invoca después de que Angular haya inicializado completamente la vista de un componente||||
// OnChanges (ngOnChanges()): Este último es un ciclo de vida que se llama cuando cambia cualquier propiedad enlazada a datos de una directiva
export class ListTableComponent<T> implements OnInit, AfterViewInit, OnChanges {
  icAdd = IconService.prototype.getIcon("icRegister");
  icMin = IconService.prototype.getIcon("icMin");

  // Para poder compartir datos entre un componente principal y secundario, porque es lo que necesitamos hacer, ya que esta tabla va ser compartida en toda mi aplicación si así lo quisiera, entonces para lograr ésto vamos a usar algunos decoradores.

  // Como esta tabla se va a comportar como un componente secundario o hijo, para poder indicarle desde un componente padre que pueda recibir algún valor podemos usar el decorador @input.
  // ya con este decorador vamos a tener el control sobre éste componente||||
  // En éste caso le vamos a poder pasar un servicio por defecto que ya lo hemos usado en nuestro otro componente compartido de tabla, entonces aquí también lo vamos a usar y el servicio por defecto que vamos a usar es un servicio abstracto llamado GetAll||||
  // Y bueno basicamente lo que hacemos para poder llamar a un servicio de este tipo que contiene un metodo abstracto yo desde mi servicio personalizado es decir de mi CategoryService necesito implementar este mismo metodo para que sea posible instanciarlo
  @Input() service?: DefaultService;
  // Tambien tenemos que configurar las columnas que necesito mostrar en esta tabla desde un componente padre, entonces vamos a decorar otra propiedad aquí.||||
  @Input() columns?: TableColumns<T>[]; //->Nos vamos a configurar este TableColumns
  @Input() numRecords?: number = 10;
  // Luego Aquí también vamos a configurar nuestra propiedad para poder pasarle basicamente nuestros filtros que necesitamos hacer y que refleje los cambios en mi tabla y bueno yo lo voy a denominar como|||
  @Input() getInputs: any;
  // Otra propiedad también que voy a configurar es para un ordenamiento por un campo por defecto ya sea por una fecha, o por el id o cualquiera que fuese|||
  @Input() sortBy?: string;
  // Y también voy a configurar el tipo de ordenamiento ya sea ascendente o descendente|||| por defecto lo dejaré en ascendente
  @Input() sortDir: string = "asc";
  // Y una última propiedad que voy a decorar como @Input va ser nuestro Footer de nuestra tabla||||
  @Input() footer: TableFooter<T>[] = [];

  //Ahora para poder emitir valores desde este componente, es decir desde un componente hijo a un componente padre podemos utilizar el decorador|||| @Output()
  @Output() rowClick = new EventEmitter<T>();
  //Entonces podemos ver de que el decorador @Input se usa para recibir datos en un componente mientras que el decorador @Output se usa para enviar datos fuera de un componente.

  // @Output envía datos exponiendo a los productores de eventos, generalmente objetos EventEmitter.

  //Ahora vamos a implementar otro decorador llamado|||| que basicamente es un decorador que configura una consulta de vista. Quiere decir que cuando se detecta algún cambio, busca el primer elemento o la directiva que coincida con el selector en la vida DOM. Si el DOM de la vista cambia y un elemento secundario coincide con el selector, la propiedad se actualiza.
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  //   Aquí voy a declarar otra propiedad para poder emitir algunos eventos con mis inputs para filtrar||||
  changesGetInputs = new EventEmitter<T>();
  //   Ahora para poder hacer el filtrado, ordenamiento y paginación de datos voy a declarar una propiedad que la voy a denominar dataSource|||| y nos vamos a apoyar de la fuente de datos MatTableDataSource que es de Angular Material
  dataSource = new MatTableDataSource<T>();
  // Voy a agregar un array de tipo generico o string también para mis columnas visibles de mi tabla||||
  visibleColumns?: Array<keyof T | string>;
  // Lo mismo para mi footer||||
  visibleFooter?: Array<keyof T | {}>;
  // Voy a configurar también los parámetros para mi paginación||||
  paginatorOptions = {
    pageSizeOptions: [this.numRecords, 20, 50],
    pageSize: this.numRecords,
    pageLength: 0,
  };

  constructor(
    // Injectamos algunos servicios que vamos a necesitar
    private _spinner: NgxSpinnerService,
    private _alert: AlertService
  ) {}

  // Ahora ya podemos definir nuestro metodo ngOnInit||||
  ngOnInit(): void {
    // En el método ngOnInit: recordemos que es lo que hace que mi componente se carge por primera vez, aquí vamos a declarar las propiedades de paginacion y ordenamiento a través del MatTableDataSource||||
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.paginatorOptions.pageSizeOptions = [this.numRecords, 20, 50];
    this.paginatorOptions.pageSize = this.numRecords;
  }

  // Bien ahora vamos a implementar el método ngOnChanges|||| que tiene por defecto una interfaz llamada SimpleChanges que nos va a ayudar para ver los cambios de valores
  ngOnChanges(changes: SimpleChanges): void {
    // Llamo a mis columns|||| para detectar algún cambio y ejecuto un método que le voy a llamar setVisibleColumns()||||
    if (changes.columns) {
      this.setVisibleColumns();
    }
    // Lo mismo para mis getInputs y el paginator|||| cada que detecte un cambio voy a emitir através de un evento el changesGetInputs y también iniciamos nuestra pagina de principal en 0
    if (changes.getInputs && this.paginator) {
      this.paginator.pageIndex = 0;
      this.changesGetInputs.emit();
    }

    if (changes.numRecords && !changes.numRecords.firstChange) {
      this.paginatorOptions.pageSizeOptions = [this.numRecords, 20, 50];
      this.paginatorOptions.pageSize = this.numRecords;
    }
  }

  // Ahora vamos a implementar el método ngAfterViewInit()||||
  ngAfterViewInit(): void {
    //|||| para ejecutar nuestro servicio que consulta al API que me traerá mis registros paginados y filtrados
    this.getDataByService();
    // y Vamos a continuar ejecutando otro metodo que le voy a llamar sortChanges||||
    this.sortChanges();
    // y Para terminar con este metodo ngAfterViewInit() vamos a crear otro metodo llamado paginatorChanges||||
    this.paginatorChanges();
  }

  async getDataByService() {
    // Podemos decir de que cada que se ejecute un evento através de la propiedad|||| vamos a invocar al service GetAll|||
    this.changesGetInputs
      .pipe(
        // primero voy a decir startWith|||| para ejecutar el estado inicial y con switchMap|||| voy a pasar a ejecutar ya el servicio para poder empezar a emitir los valores correspondientes||||
        startWith(""),
        switchMap(() => {
          // Aquí podemos mostrar el spinner
          this._spinner.show("modal-table");
          return this.service.GetAll(
            this.paginator.pageSize,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.getInputs
          );
        })
      )
      // Luego nos vamos a subscribir|||| para finalmente setear la data
      .subscribe((data) => {
        this.setData(data); // vamos a implementar este metodo tambien||||
        this._spinner.hide("modal-table");
      });
    // regresamos al metodo ngAfterViewInit
  }

  sortChanges() {
    // Aquí me voy a subscribir con mis sort del MatSort||| que tengo declarado en la parte de arriba y lo que voy hacer es iniciar mi paginator osea en la pagina de inicio en 0|||| y voy a emitir nuevamente a través de mi propiedad changesGetInput|||| recordemos que esto va a responder a cualquier cambio que se detecte
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.changesGetInputs.emit();
    });
    // regresamos al metodo ngAfterViewInit
  }

  paginatorChanges() {
    // Aqui vamos a emitir nuestro changesGetInputs tambien|||| cada ves que nos subscribamos a nuestro paginator con el atributo page
    this.paginator.page.subscribe(() => {
      this.changesGetInputs.emit();
    });
    // con esto terminamos de implementar el metodo ngAfterViewInit
  }

  setData(data: any) {
    if (data.isSuccess) {
      // si data.isSuccess es true, Vamos a ejecutar el método para hacer visible las columnas||||
      this.setVisibleColumns(); //Vamos a la implementación de este metodo
      // y Aquí voy a asignar la cantidad de registros||| va ser igual a lo que viene en mi API en una propiedad que le pusimos totalRecords||||
      this.paginatorOptions.pageLength = data.totalRecords;
      // Lo mismo para nuestro dataSource|||| aquí le voy a pasar mis items que responde mi API
      this.dataSource.data = data.data;
      // Y también lo mismo para el footer de la tabla||||
      // si es true, Vamos a ejecutar un metodo setFooter que ahora lo vamos a crear también
      if (data.data.footer) this.setFooter(data.data.footer); //Ir al metodo setFooter
    } else {
      // Finalmente aquí en el else podemos llamar a nuestro servicio de alerta de SweetAlert
      this._alert.warn("Excelente", "Ha ocurrido un error al cargar los datos");
    }
    // Regresamos al metodo getDataByService para ocultar nuestro spinner activo
  }

  setVisibleColumns() {
    // Con mi propiedad visibleColumns|||| que tengo declarada como un array arriba de tipo generico o string voy a pasarle mis columnas|||| con las propiedades que necesito
    this.visibleColumns = this.columns
      // Aquí vamos a transformar los datos para ello voy a necesitar el|||| y le pasaré mis columnas
      .filter((column: any) => column.visible)
      // Ahora voy a ejecutar con el operador|||| para indicar ||||que traiga el property de mis columnas
      .map((column: any) => column.property);
    // Regresamos al metodo ngOnChanges
  }

  setFooter(data: any) {
    // Iniciamos nuestra propiedad|||| con un array vacío||||
    this.visibleFooter = [];
    if (this.footer.length && data) {
      // Aquí condicionamos nuestra data y vamos hacer un foreach||| para obtener los atributos de mi footer
      this.footer.forEach((e) => {
        this.visibleFooter.push({
          label: e.label,
          value: data[e.property],
          tooltip: e.tooltip,
        });
      });
    }
    // Regresamos al metodo setData
  }

  // Esta función resta 1 a la cantidad de compra de una fila si la cantidad actual es mayor que 0.
  subtractQuantityPurchase(row: any) {
    if (row.quantity > 0) {
      // Restar 1 a la cantidad si es mayor que 0.
      row.quantity--;
    }
    // Llamar a la función para recalcular el monto total de la compra.
    this.calculateTotalAmountPurchase(row);
  }

  // Esta función aumenta en 1 la cantidad de compra de una fila.
  increaseQuantityPurchase(row: any) {
    // Aumentar en 1 la cantidad de compra.
    row.quantity++;
    // Llamar a la función para recalcular el monto total de la compra.
    this.calculateTotalAmountPurchase(row);
  }

  subtractQuantitySale(row: any) {
    if (row.quantity > 0) {
      row.quantity--;
    }
    this.calculateTotalAmountSale(row);
  }

  increaseQuantitySale(row: any) {
    row.quantity++;
    this.calculateTotalAmountSale(row);
  }

  // Esta función calcula el monto total de una compra basándose en la cantidad 
  //y el precio unitario de compra.
  calculateTotalAmountPurchase(row: any) {
    // Extraer la cantidad y el precio unitario de compra del objeto 'row'.
    const quantity = row.quantity;
    const unitPurchasePrice = row.unitPurchasePrice;
    // Verificar si hay una cantidad o un precio unitario de compra.
    if (quantity || unitPurchasePrice) {
      // Calcular el monto total y asignarlo a la propiedad 'totalAmount' del objeto 'row'.
      row.totalAmount = (quantity * unitPurchasePrice).toFixed(2);
    } else {
      // Si no hay cantidad ni precio unitario, establecer el monto total como "0.00".
      row.totalAmount = "0.00";
    }
  }

  calculateTotalAmountSale(row: any) {
    const quantity = row.quantity;
    const unitSalePrice = row.unitSalePrice;

    if (quantity || unitSalePrice) {
      row.totalAmount = (quantity * unitSalePrice).toFixed(2);
    } else {
      row.totalAmount = "0.00";
    }
  }
}
