import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '@shared/apis/endpoint';
import { BaseApiResponse } from '@shared/models/base-api-response.interface';
import { DocumentType } from '@shared/models/document-type.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  constructor(private _http: HttpClient) { }

  listDocumentTypes(): Observable<DocumentType[]> {
    const requestUrl = `${env.api}${endpoint.LIST_DOCUMENT_TYPES}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseApiResponse) => {
        return resp.data;
      })
    )
  }

}