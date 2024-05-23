import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MomentDateModule } from "@angular/material-moment-adapter";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MY_DATE_FORMATS } from "@shared/functions/date-format";
import { IconService } from "@shared/services/icon.service";
import { SharedModule } from "@shared/shared.module";
import moment, { Moment } from "moment";

@Component({
  selector: "app-filter-date-range-ymd",
  standalone: true,
  imports: [SharedModule, MomentDateModule],
  templateUrl: "./filter-date-range-ymd.component.html",
  styleUrls: ["./filter-date-range-ymd.component.scss"],
  // MAT_DATE_FORMATS: es una constante que representa el token de Angular Material utilizado para personalizar los formatos de fecha en los componentes relacionados con fechas.
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class FilterDateRangeYmdComponent implements OnInit, OnChanges {
  // Definimos 2 decoradores de tipo Input son entradas que representan fechas.
  @Input() start: string; // Entrada 'start' del componente
  @Input() end: string; // Entrada 'end' del componente
  @Input() maxDate: Moment = moment(); // Entrada 'maxDate' con valor por defecto, con la finalidad de no filtrar mas allá de la fecha actual
  @Output() rangeDate = new EventEmitter<any>(); // Salida 'rangeDate' que emite eventos de rango de fechas

  // Declaración de un formulario
  range = new FormGroup({
    startDate: new FormControl(), // Campo 'startDate'
    endDate: new FormControl(), // Campo 'endDate'
  });

  // Obtiene íconos utilizando el servicio IconService
  icToday = IconService.prototype.getIcon("icToday");

  constructor() {}

  ngOnInit(): void {}

  // Entonces aquí vamos usar el método ngOnChanges para poder hacer alguna acción cuando las propiedades de entrada cambien
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.start || changes.end) {
      // Si cambian 'start' o 'end', actualiza los valores en el formulario
      this.range.get("startDate").patchValue(this.start);
      this.range.get("endDate").patchValue(this.end);
    }
  }

  // Método para manejar eventos del selector de fechas
  // Este tipo se utiliza para representar eventos generados por un componente de selección de fecha
  addEvent(event: MatDatepickerInputEvent<Date>) {
    if (event.value != null) {
      this.emitDates(); // Llama al método emitDates si la fecha seleccionada no es nula
    }
  }

  emitDates() {
    // Obtiene los valores de los campos de fecha del formulario
    const startDateControl = this.range.get("startDate").value;
    const endDateControl = this.range.get("endDate").value;

    // startDateControl y endDateControl contendrán las fechas seleccionadas o sus representaciones en formato string
    if (startDateControl && endDateControl) {
      const startDate = startDateControl.format("YYYY-MM-DD");
      const endDate = endDateControl.format("YYYY-MM-DD");
      const data = {
        startDate, // Incluye la fecha de inicio en el formato "YYYY-MM-DD"
        endDate, // Incluye la fecha de fin en el formato "YYYY-MM-DD"
      };

      this.rangeDate.emit(data); // Emite los datos de fecha a través del evento 'rangeDate'
    }
  }
}
