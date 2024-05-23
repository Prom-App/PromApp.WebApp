import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApiResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { environment as env } from "src/environments/environment";
import { endpoint } from "@shared/apis/endpoint";
import { map } from "rxjs/operators";
import {
  SaleByIdResponseDto,
  SaleResponse,
} from "../models/sale-response.interface";
import { getIcon } from "@shared/functions/helpers";
import { SaleRequest } from "../models/sale-request.interface";

@Injectable({
  providedIn: "root",
})
export class SaleService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_SALES
    }?Records=${size}&Sort=${sort}&Order=${order}&NumPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseApiResponse>(requestUrl)
      .pipe(map((resp) => this.transformSaleData(resp)));
  }

  private transformSaleData(response: BaseApiResponse): BaseApiResponse {
    const badgeColors: Record<string, string> = {
      BOLETA: "text-am-main-blue-dark bg-am-main-blue-light",
      FACTURA: "text-am-new-green-dark bg-am-new-green-light",
    };

    response.data.forEach((sale: SaleResponse) => {
      sale.badgeColor =
        badgeColors[sale.voucherDescription] || "text-gray bg-gray-light";
      sale.icView = getIcon(
        "icVisibility",
        "Ver Detalle de Entrada de venta",
        true
      );

      sale.icInvoice =
        sale.voucherDescription === "FACTURA"
          ? getIcon("icInvoice", "Exportar Factura", true)
          : getIcon("icTicket", "Exportar Boleta", true);

      sale.icCancel = getIcon("icCancel", "Anular Venta", true);
    });

    return response;
  }

  saleById(saleId: number): Observable<SaleByIdResponseDto> {
    const requestUrl = `${env.api}${endpoint.SALE_BY_ID}${saleId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseApiResponse) => {
        return resp.data;
      })
    );
  }

  saleRegister(sale: SaleRequest): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${endpoint.SALE_REGISTER}`;
    return this._http.post<BaseApiResponse>(requestUrl, sale);
  }

  saleCancel(saleId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.SALE_CANCEL}${saleId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseApiResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }

  saleExportToPdfSaleDetail(saleId: number): Observable<Blob> {
    const requestUrl = `${env.api}${endpoint.EXPORT_PDF_SALE_DETAIL}${saleId}`;
    return this._http.get(requestUrl, { responseType: "blob" });
  }
}
