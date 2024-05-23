import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { toBase64 } from "@shared/functions/helpers";
import { IconService } from "@shared/services/icon.service";

@Component({
  selector: "app-img-selector",
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: "./img-selector.component.html",
  styleUrls: ["./img-selector.component.scss"],
})
export class ImgSelectorComponent implements OnInit {
  // Propiedad que almacenará la representación en base64 de la imagen seleccionada
  imgBase64: string;

  // Propiedad de entrada marcada con @Input() para recibir la URL de la imagen actual
  @Input()
  urlCurrentImg: string;

  // Propiedad de salida marcada con @Output()
  // para emitir eventos cuando se selecciona una imagen
  @Output()
  selectedImage: EventEmitter<File> = new EventEmitter<File>();

  // Instancia de la clase IconService para obtener el ícono de carga ("icUpload")
  icUpload = IconService.prototype.getIcon("icUpload");

  constructor() {}

  ngOnInit(): void {}

  // Método para cuando se selecciona una imagen
  selectedImg(event: Event) {
    // Verifica si el evento proviene de un elemento de entrada HTML
    if (event.target instanceof HTMLInputElement) {
      // Obtiene el elemento de entrada
      const inputElement: HTMLInputElement = event.target;
      // Verifica si hay archivos seleccionados
      if (inputElement.files && inputElement.files.length > 0) {
        // Obtiene el primer archivo seleccionado
        const file: File = inputElement.files[0];
        // Convierte el archivo a su representación en base64
        toBase64(file).then((value: string) => (this.imgBase64 = value));
        // Emite el evento indicando que se ha seleccionado una imagen
        // y pasamos el archivo como argumento
        this.selectedImage.emit(file);
        // Reinicia la URL de la imagen actual
        this.urlCurrentImg = null;
      }
    }
  }
}
