import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseApiResponse } from "@shared/models/base-api-response.interface";
import { Observable } from "rxjs";
import { ProductDetailsResponse } from "../models/sale-response.interface";
import { map } from "rxjs/operators";
import { getIcon } from "@shared/functions/helpers";
import { environment as env } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SaleDetailService {
  constructor(private _http: HttpClient) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string,
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${
      endpoint.PRODUCT_STOCK_WAREHOUSE_ID
    }?Records=${size}&Sort=${sort}&Order=${order}&NumPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseApiResponse>(requestUrl)
      .pipe(map((resp) => this.transformProductsData(resp)));
  }

  private transformProductsData(response: BaseApiResponse): BaseApiResponse {
    response.data.forEach((pro: ProductDetailsResponse) => {
      pro.icAdd = getIcon("icAdd", "Agregar producto al detalle", true);
      pro.quantity = 0;
      pro.totalAmount = 0;
    });

    return response;
  }
}
