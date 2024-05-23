import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseApiResponse } from "@shared/models/base-api-response.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { ProductDetailsResponse } from "../models/product-entry-response.interface";

@Injectable({
  providedIn: "root",
})
export class ProductEntryDetailService {
  constructor(private _http: HttpClient) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_PRODUCTS
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
      pro.unitPurchasePrice = 0;
      pro.totalAmount = 0;
    });

    return response;
  }
}
