import { Component, Input, OnInit } from '@angular/core';
import icCloudDownload from '@iconify/icons-ic/twotone-cloud-download';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { DownloadXslxService } from '../../services/download-xslx.service';

// import * as XLSX from 'xlsx'; 

@Component({
    selector: 'vex-download-csv',
    templateUrl: './download-csv.component.html',
    styleUrls: ['./download-csv.component.scss']
})
export class DownloadCsvComponent implements OnInit {

    icCloudDownload = icCloudDownload

    @Input() url: string = null;
    @Input() getInputs: string = null;
    @Input() filename: string = '';

    constructor(
        public downloadXslxService: DownloadXslxService,
        private spinner: NgxSpinnerService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
    }

    download() {

        this.dialog.open(ModalConfirmComponent, {
            width: '320px',
            data: {
                "title": "Confirmar",
                "text": "Esta acción descargará total de registros en formato .xlsx ignorando la paginación.",
                "button": "DESCARGAR"
            }
        }).afterClosed().subscribe(result => {

            if (result) {
                this.executeDownload();
            }

        });

    }

    executeDownload() {

        this.spinner.show();
        
        this.downloadXslxService.executeDownload(this.url + this.getInputs)

        .subscribe((excelData: Blob) => {
            const fileName = this.filename;
      
            // Crear una URL segura para el objeto Blob
            const blobUrl = URL.createObjectURL(excelData);
      
            // Crear un enlace temporal y establecer sus atributos
            const downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = fileName;
      
            // Simular un clic en el enlace para iniciar la descarga
            downloadLink.click();
      
            // Liberar la URL del objeto Blob
            URL.revokeObjectURL(blobUrl);
            this.spinner.hide();
          });
        }

}
