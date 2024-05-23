import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseApiResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import {
  WarehouseById,
  WarehouseResponse,
} from "../models/warehouse-response.interface";
import { WarehouseRequest } from "../models/warehouse-request.interface";

@Injectable({
  providedIn: "root",
})
export class WarehouseService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_WAREHOUSES
    }?Records=${size}&Sort=${sort}&Order=${order}&NumPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseApiResponse>(requestUrl)
      .pipe(map((resp) => this.transformWarehouseData(resp)));
  }

  private transformWarehouseData(response: BaseApiResponse): BaseApiResponse {
    // Creamos un objeto que mapea los estados de los almacenes y le asignamos su color tmb
    const badgeColors: Record<number, string> = {
      0: "text-gray bg-gray-light",
      1: "text-green bg-green-light",
    };

    // Iteramos sobre los datos de los almacenes y les agregamos el color de estado y los íconos de edición y eliminación.
    response.data.forEach((warehouse: WarehouseResponse) => {
      // Obtenemos el color de estado del almacén según su estado 0 o 1.
      warehouse.badgeColor =
        badgeColors[warehouse.state] || "text-gray bg-gray-light";
      warehouse.icEdit = getIcon("icEdit", "Editar Almacén", true);
      warehouse.icDelete = getIcon("icDelete", "Eliminar Almacén", true);
    });

    return response;
  }

  warehouseById(warehouseId: number): Observable<WarehouseById> {
    const requestUrl = `${env.api}${endpoint.WAREHOUSE_BY_ID}${warehouseId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseApiResponse) => {
        return resp.data;
      })
    );
  }

  warehouseRegister(warehouse: WarehouseRequest): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${endpoint.WAREHOUSE_REGISTER}`;
    return this._http.post<BaseApiResponse>(requestUrl, warehouse);
  }

  warehouseEdit(
    warehouseId: number,
    warehouse: WarehouseRequest
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${endpoint.WAREHOUSE_EDIT}${warehouseId}`;
    return this._http.put<BaseApiResponse>(requestUrl, warehouse);
  }

  warehouseRemove(warehouseId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.WAREHOUSE_REMOVE}${warehouseId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseApiResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
