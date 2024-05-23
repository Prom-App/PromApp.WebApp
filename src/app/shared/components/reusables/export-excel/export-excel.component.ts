import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { IconsModule } from "@shared/import-modules/icons.module";
import { DownloadXslxService } from "@shared/services/download-xslx.service";
import { IconService } from "@shared/services/icon.service";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";

@Component({
  selector: "app-export-excel",
  standalone: true,
  imports: [CommonModule, MatButtonModule, IconsModule, MatTooltipModule],
  templateUrl: "./export-excel.component.html",
  styleUrls: ["./export-excel.component.scss"],
})
export class ExportExcelComponent implements OnInit {
  // Definimos una propiedad llamada icCloudDownload y le asignamos
  //el resultado de la función getIcon de IconService
  icCloudDownload = IconService.prototype.getIcon("icCloudDownload");

  // Definimos propiedades de entrada usando el decorador @Input()
  @Input() url: string = null; // URL para la descarga
  @Input() getInputs: string = null; // Parámetros para la solicitud de descarga
  @Input() filename: string = null; // Nombre del archivo descargado

  // Definimos una propiedad llamada infoTooltip
  // y le asignamos un mensaje para el tooltip
  infoTooltip = "Descargar resultados en formato Excel";

  constructor(
    public _downloadXslxService: DownloadXslxService,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  download() {
    Swal.fire({
      title: "Confirmar",
      text: "Esta acción descargará los registros en formato .xlsx ignorando la paginación.",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "rgb(210, 155, 253)",
      cancelButtonColor: "rgb(79, 109, 253)",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this.executeDownload();
      }
    });
  }

  // Método llamado executeDownload() que realiza la descarga del archivo .xlsx
  executeDownload() {
    // Mostramos un spinner mientras se realiza la descarga
    this._spinner.show();
    // Llamamos al servicio de descarga con la URL y parámetros
    this._downloadXslxService
      .executeDownload(this.url + this.getInputs)
      .subscribe((excelData: Blob) => {
        // Obtenemos el nombre de archivo
        const fileName = this.filename;
        // Creamos una URL para el Blob de datos
        const blobUrl = URL.createObjectURL(excelData);
        // Creamos un elemento <a> para la descarga
        const downloadLink = document.createElement("a");
        // Asignamos la URL del Blob
        downloadLink.href = blobUrl;
        // Asignamos el nombre de archivo
        downloadLink.download = fileName;
        // Simulamos el clic en el enlace de descarga
        downloadLink.click();
        // Liberamos la URL del Blob
        URL.revokeObjectURL(blobUrl);
        // Ocultamos el spinner una vez completada la descarga
        this._spinner.hide();
      });
  }
}
