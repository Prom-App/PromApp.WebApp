import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import {
  BaseApiResponse
} from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { CategoryRequest } from "../models/category-request.interface";
import { CategoryResponse } from "../models/category-response.interface";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_CATEGORIES
    }?Records=${size}&Sort=${sort}&Order=${order}&NumPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseApiResponse>(requestUrl).pipe(
      map((resp) => {
        resp.data.forEach(function (e: CategoryResponse) {
          switch (e.state) {
            case 0:
              e.badgeColor = "text-gray bg-gray-light";
              break;
            case 1:
              e.badgeColor = "text-green bg-green-light";
              break;
            default:
              e.badgeColor = "text-gray bg-gray-light";
              break;
          }
          e.icEdit = getIcon("icEdit", "Editar Categoría", true);
          e.icDelete = getIcon("icDelete", "Eliminar Categoría", true);
        });
        return resp;
      })
    );
  }

  CategoryRegister(category: CategoryRequest): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${endpoint.CATEGORY_REGISTER}`;
    return this._http.post(requestUrl, category).pipe(
      map((resp: BaseApiResponse) => {
        return resp;
      })
    );
  }

  CategoryById(CategoryId: number): Observable<CategoryResponse> {
    const requestUrl = `${env.api}${endpoint.CATEGORY_BY_ID}${CategoryId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseApiResponse) => {
        return resp.data;
      })
    );
  }

  CategoryEdit(
    CategoryId: number,
    category: CategoryRequest
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${endpoint.CATEGORY_EDIT}${CategoryId}`;
    return this._http.put(requestUrl, category).pipe(
      map((resp: BaseApiResponse) => {
        return resp;
      })
    );
  }

  CategoryRemove(CategoryId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.CATEGORY_REMOVE}${CategoryId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseApiResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
