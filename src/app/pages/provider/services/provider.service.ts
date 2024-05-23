import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseApiResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { ProviderRequest } from "../models/provider-request.interface";
import {
  ProviderById,
  ProviderResponse,
} from "../models/provider-response.interface";

@Injectable({
  providedIn: "root",
})
export class ProviderService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_PROVIDERS
    }?Records=${size}&Sort=${sort}&Order=${order}&NumPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseApiResponse>(requestUrl)
      .pipe(map((resp) => this.transformProviderData(resp)));
  }

  private transformProviderData(response: BaseApiResponse): BaseApiResponse {
    const badgeColors: Record<number, string> = {
      0: "text-gray bg-gray-light",
      1: "text-green bg-green-light",
    };

    response.data.forEach((prov: ProviderResponse) => {
      prov.badgeColor = badgeColors[prov.state] || "text-gray bg-gray-light";
      prov.icEdit = getIcon("icEdit", "Editar Proveedor", true);
      prov.icDelete = getIcon("icDelete", "Eliminar Proveedor", true);
    });

    return response;
  }

  providerById(providerId: number): Observable<ProviderById> {
    const requestUrl = `${env.api}${endpoint.PROVIDER_BY_ID}${providerId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseApiResponse) => {
        return resp.data;
      })
    );
  }

  providerRegister(provider: ProviderRequest): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${endpoint.PROVIDER_REGISTER}`;
    return this._http.post<BaseApiResponse>(requestUrl, provider);
  }

  providerEdit(
    providerId: number,
    provider: ProviderRequest
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${endpoint.PROVIDER_EDIT}${providerId}`;
    return this._http.put<BaseApiResponse>(requestUrl, provider);
  }

  providerRemove(providerId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.PROVIDER_REMOVE}${providerId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseApiResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
