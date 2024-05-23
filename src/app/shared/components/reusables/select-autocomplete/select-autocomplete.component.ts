import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { SelectAutocomplete } from "@shared/models/select-autocomplete.interface";
import { IconService } from "@shared/services/icon.service";
import { SharedModule } from "@shared/shared.module";
import { scaleInOutAnimation } from "src/@vex/animations/scale-in-out.animation";

@Component({
  selector: "app-select-autocomplete",
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: "./select-autocomplete.component.html",
  styleUrls: ["./select-autocomplete.component.scss"],
  animations: [scaleInOutAnimation],
})
export class SelectAutocompleteComponent implements OnInit, OnChanges {
  // Propiedades de entrada

  //control=va a representar mi inputControl para el autocomplete
  @Input() control: FormControl = new FormControl(null);
  //label=valor de nuestro texto en el autocomplete
  @Input() label: string = "";
  //placeholder=valor interno del autocomplete
  @Input() placeholder: string = "";
  //listOptions=listado para mostrar en el autocomplete
  @Input() listOptions?: SelectAutocomplete[];
  //required=propiedad para saber si es requerido o no nuestro autocomplete
  @Input() required: boolean = false;
  //readonly=para solo lectura
  @Input() readonly: boolean = false;
  //opcionesfiltradas=para setear los filtros y obtener el resultado en esta propiedad
  opcionesfiltradas: SelectAutocomplete[];
  
  @Output() itemSelected = new EventEmitter<string>();
  selectedItem: string;

  constructor(public iconsService: IconService) {}

  ngOnChanges(changes: SimpleChanges) {
    // Itera sobre cada propiedad que ha cambiado
    for (let property in changes) {
      // Verifica si la propiedad es "listOptions"
      if (property === "listOptions") {
        // Verifica si el valor previo de "listOptions" no es indefinido
        if (changes.listOptions.previousValue !== undefined) {
          // Filtra las opciones y asigna el resultado a "opcionesfiltradas"
          this.opcionesfiltradas = this.filter("", this.listOptions);
        }
        // Verifica si el valor actual de "listOptions" no es indefinido
        if (changes.listOptions.currentValue !== undefined) {
          // Filtra las opciones y asigna el resultado a "opcionesfiltradas"
          this.opcionesfiltradas = this.filter("", this.listOptions);
           // Verifica si el valor actual de "listOptions" es un array vacío
          if (changes.listOptions.currentValue.length === 0) {
            // Reinicia el valor del control (FormControl)
            this.control.reset();
          }
        }
      }
    }
    this.initMode();
    // this.setValidators();
  }

  ngOnInit(): void {
    this.initMode();
  }

  onOptionSelected(event: any): void {
    if (this.listOptions) {
      const selectedItem = this.listOptions.find((item) => item.id === event);

      if (selectedItem) {
        this.itemSelected.emit(selectedItem.id);
      }
    }
  }

  private initMode() {
    // this.setValidators();
    // Inicializa "opcionesfiltradas" con las opciones actuales
    this.opcionesfiltradas = this.listOptions;
    // Nos vamos a suscribir a los cambios en el valor del control
    this.control.valueChanges.subscribe((value) => {
      // Verifica si hay un valor en el control
      if (value) {
        // Filtra las opciones basándose en el valor y actualiza "opcionesfiltradas"
        this.opcionesfiltradas = this.filter(value, this.listOptions);
      } else {
        // Si no hay valor, filtra con un valor vacío y actualiza "opcionesfiltradas"
        this.opcionesfiltradas = this.filter("", this.listOptions);
      }
        // Verifica la opción seleccionada en el control
      this.checkOption(this.control.value, this.listOptions);
    });

     // Habilita el control
    this.control.enable();
  }

  setValidators() {
    if (this.required) {
      this.control.setValidators([Validators.required]);
      this.control.updateValueAndValidity();
    } else {
      this.control.clearValidators();
      this.control.updateValueAndValidity();
    }
  }

  //Vamos a personalizar la visualización del valor seleccionado 
  //en el input del autocomplete
  mostrarDropdrown(id: string) {
    // Inicializa la variable para almacenar el valor seleccionado
    let selectValue = null;
    // Verifica si hay opciones y si hay un ID proporcionado
    if (this.listOptions && id) {
      // Busca la opción con el ID correspondiente en la lista de opciones
      let Opcion = this.listOptions.find((opcion) => opcion.id === id);
      // Asigna la descripción de la opción a selectValue si la opción existe, 
      //de lo contrario, asigna null
      selectValue = Opcion != undefined ? Opcion.description : null;
    }
    // Devuelve el valor seleccionado
    return selectValue;
  }

  private filter(value, listOptions: SelectAutocomplete[]) {
    // Inicializa la variable para almacenar el valor de filtrado
    let filterValue = "";
    let aOptionsFiltered = [];
    // Verifica si el tipo de valor es una cadena para asignar el filterValue en consecuencia
    if (typeof value === "string") {
      filterValue = value.toLowerCase();
    }
    // Verifica si listOptions no es undefined y tiene elementos
    if (listOptions != undefined && listOptions.length > 0) {
      // Filtra las opciones basándose en la descripción y filterValue
      aOptionsFiltered = listOptions.filter((option) => {
        return option.description.toLowerCase().includes(filterValue);
      });
      // Establece el placeholder en el valor de la etiqueta (label)
      this.placeholder = this.label;
    } else {
      // Si listOptions está vacío o es undefined, establece un placeholder de lista vacía
      this.placeholder = "El listado de " + this.label + " está vacio";
    }
    // Devuelve las opciones filtradas
    return aOptionsFiltered;
  }

  private checkOption(value, listOptions): any {
    // Verifica si hay opciones
    if (listOptions) {
      // Obtiene una matriz de IDs de las opciones
      let ids = listOptions.map((opcion) => opcion.id);
      // Verifica si el valor está incluido en la matriz de IDs
      let isValid = ids.includes(value);
      // Si el valor es válido
      if (isValid) {
        // Reinicia el control
        this.control.reset;
      } else {
        // Si el valor no es válido y se requiere, establece un error en el control
        if (this.required) this.control.setErrors({ required: true });
      }
    }
  }
}
