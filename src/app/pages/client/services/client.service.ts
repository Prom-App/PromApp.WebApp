import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseApiResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { ClientRequest } from "../models/client-request.interface";
import {
  ClientById,
  ClientResponse,
} from "../models/client-response.interface";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_CLIENTS
    }?Records=${size}&Sort=${sort}&Order=${order}&NumPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseApiResponse>(requestUrl)
      .pipe(map((resp) => this.transformClientData(resp)));
  }

  private transformClientData(response: BaseApiResponse): BaseApiResponse {
    const badgeColors: Record<number, string> = {
      0: "text-gray bg-gray-light",
      1: "text-green bg-green-light",
    };

    response.data.forEach((prov: ClientResponse) => {
      prov.badgeColor = badgeColors[prov.state] || "text-gray bg-gray-light";
      prov.icEdit = getIcon("icEdit", "Editar Cliente", true);
      prov.icDelete = getIcon("icDelete", "Eliminar Cliente", true);
    });

    return response;
  }

  clientById(clientId: number): Observable<ClientById> {
    const requestUrl = `${env.api}${endpoint.CLIENT_BY_ID}${clientId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseApiResponse) => {
        return resp.data;
      })
    );
  }

  clientRegister(client: ClientRequest): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${endpoint.CLIENT_REGISTER}`;
    return this._http.post<BaseApiResponse>(requestUrl, client);
  }

  clientEdit(
    clientId: number,
    client: ClientRequest
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${endpoint.CLIENT_EDIT}${clientId}`;
    return this._http.put<BaseApiResponse>(requestUrl, client);
  }

  clientRemove(clientId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.CLIENT_REMOVE}${clientId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseApiResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
