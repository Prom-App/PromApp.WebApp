import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseApiResponse } from "@shared/models/base-api-response.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import {
  ProductEntryByIdResponseDto,
  ProductEntryResponse,
} from "../models/product-entry-response.interface";
import { ProductEntryRequest } from "../models/product-entry-request.interface";
import { AlertService } from "@shared/services/alert.service";

@Injectable({
  providedIn: "root",
})
export class ProductEntryService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_PRODUCT_ENTRIES
    }?Records=${size}&Sort=${sort}&Order=${order}&NumPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseApiResponse>(requestUrl)
      .pipe(map((resp) => this.transformProductEntryData(resp)));
  }

  private transformProductEntryData(
    response: BaseApiResponse
  ): BaseApiResponse {
    // const badgeColors: Record<string, string> = {
    //   BOLETA: "text-am-main-blue-dark bg-am-main-blue-light",
    //   FACTURA: "text-am-new-green-dark bg-am-new-green-light",
    // };

    response.data.forEach((pe: ProductEntryResponse) => {
      // pe.badgeColor =
      //   badgeColors[pe.voucherDescription] || "text-gray bg-gray-light";
      pe.icView = getIcon(
        "icVisibility",
        "Ver Detalle de Entrada de producto",
        true
      );
      pe.icCancel = getIcon("icCancel", "Anular Entrada de Producto", true);
    });

    return response;
  }

  productEntryById(
    productEntryId: number
  ): Observable<ProductEntryByIdResponseDto> {
    const requestUrl = `${env.api}${endpoint.PRODUCT_ENTRY_BY_ID}${productEntryId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseApiResponse) => {
        return resp.data;
      })
    );
  }

  productEntryRegister(
    productEntry: ProductEntryRequest
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${endpoint.PRODUCT_ENTRY_REGISTER}`;
    return this._http.post<BaseApiResponse>(requestUrl, productEntry);
  }

  productEntryCancel(productEntryId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.PRODUCT_ENTRY_CANCEL}${productEntryId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseApiResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
