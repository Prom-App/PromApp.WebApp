import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input, OnInit,
  Output
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SearchOptions } from "@shared/models/search-options.interface";
import { IconService } from "@shared/services/icon.service";
import { IconModule } from "@visurel/iconify-angular";
import { scaleInOutAnimation } from "src/@vex/animations/scale-in-out.animation";

@Component({
  selector: "app-search-box-multiple",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconModule,
    MatMenuModule,
    MatTooltipModule
  ],
  templateUrl: "./search-box-multiple.component.html",
  styleUrls: ["./search-box-multiple.component.scss"],
  animations: [scaleInOutAnimation],
})

export class SearchBoxMultipleComponent implements OnInit {

  // Vamos a declarar nuestra propiedad para usar el formGroup
  form: FormGroup;

  // Y aquí declaramos algunos decoradores
  // para pasar información desde nuestro componente padre||||
  @Input() searchOptions = [];
  @Input() currentValue: string = "";
  // Haremos uso también de un decorador Output para emitir el evento de búsqueda hacia el componente principal
  @Output() search = new EventEmitter<unknown>();

  // Y Aquí vamos a inicializar las propiedades para la búsqueda
  labelSelection: SearchOptions = {
    label: "",
    value: 0,
    placeholder: "",
    validation: "",
    validation_desc: "",
    icon: "",
  };

  // Vamos a inyectar nuestro formBuilder para capturar los datos ingresados en nuestro formulario||||
  // Y también nuestro Servicio de Iconos
  constructor(private fb: FormBuilder, public iconsService: IconService) {
    // Aquí podemos inicializar nuestro form con campos vacíos por defecto
    this.form = this.fb.group({
      searchValue: [""],
      searchData: [""],
    });
  }

  ngOnInit(): void {
    // En nuestro método de ngOnInit vamos a ejecutar un método que le vamos a llamar cambiar selección, el cual va a recibir como argumento el searchOptions que enviaremos desde nuestro componente principal|||| -> Ir al método changeSelection(options: SearchOptions)
    this.changeSelection(this.searchOptions[0]);
    // Luego aquí continuamos ejecutando el método valueChanges|||| para que cada que cambie el valor de nuestro input a través del searchData nos vamos a subscribir para emitir el evento submit()||| el cual nos va a ayudar a ejecutar el buscador||||
    this.form.controls["searchData"].valueChanges.subscribe((e) => {
      if (e.trim() == "") {
        this.submit();
        // -> Ir al método submit
      }
    });
  }

  changeSelection(option: SearchOptions) {
    // Aquí seteamos la configuración inicial con el argumento de las opciones que recibiremos de nuestro componente padre||||
    this.labelSelection = option;
    // Aquí vamos a setear al control de nuestro formulario la propiedad searchValue que contendrá el numero de filtro||||
    this.form.controls["searchValue"].setValue(option.value);
    // Luego asignamos la descripción del mismo control de nuestro formulario
    this.labelSelection.validation_desc = option.validation_desc ? option.validation_desc : "";
    // Ahora vamos a asignar por cuanta cantidad de caracteres va a empezar a filtrar|| por defecto le pondré de mínimo 1 caracter||||
    let min_length = option.min_length ? option.min_length : 1;
    // Finalmente quiero ejecutar un método el cual nos va a ayudar con la validación requerida|| pasándole la validación que hemos enviado desde el componente padre y también la cantidad mínima de carácteres para empezar el filtrado|||| -> Ir al método setSearchStringValidation(validation: [], minLength: number){}
    this.setSearchStringValidation(option.validation, min_length);
  }

  setSearchStringValidation(validation: [], minLength: number) {
    // Aquí lo que vamos hacer es traer la información que hemos capturado de nuestro input a través de la propiedad searchData||||
    let searchData = this.form.get("searchData");

    // Declaramos una variable para setear algunas validaciones||||
    let setValidation = [];
    // Luego añadimos los validadores al array con el método push||||
    setValidation.push(Validators.required);
    setValidation.push(Validators.minLength(minLength));
    // vamos a validar e iterar el argumento de validation para añadirle los validations correspondientes que podamos enviarle||||
    if (validation) {
      validation.forEach((e) => {
        setValidation.push(e);
      });
    }
    // Y por último asignamos las validaciones dinámicamente con el método setValidators
    searchData.setValidators(setValidation);
    // -> Regresar al método ngOnInit
  }

  submit() {
    // Aquí unicamente lo que vamos hacer es obtener el valor de nuestro control con el método getRawValue()||||
    let data = this.form.getRawValue();
    // Ya finalmente ejecutamos emitiendo el método this.search(); que será ejecutado en el componente padre, ya que desde aquí lo estamos emitiendo||||
    this.search.emit(data);
  }

  // Creamos un método reset para poder limpiar el valor del input||||
  reset() {
    this.form.controls["searchData"].setValue("");
    // y ejecutamos finalmente el método submit
    this.submit();
  }
}
