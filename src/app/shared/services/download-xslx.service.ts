import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment as env } from "./../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class DownloadXslxService {
  constructor(private http: HttpClient) {}

  // Método executeDownload() que realiza una solicitud
  // de descarga y devuelve un Observable de Blob
  executeDownload(url: string): Observable<Blob> {
    // Realizamos una solicitud GET utilizando HttpClient
    // con la URL proporcionada y configurando el tipo de respuesta como Blob
    return this.http.get<Blob>(`${env.api}${url}`, {
      responseType: "blob" as "json",
    });
  }
}
