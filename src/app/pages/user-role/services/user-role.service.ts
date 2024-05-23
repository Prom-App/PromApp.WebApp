import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseApiResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import {
  UserRoleByIdResponse,
  UserRoleResponse,
} from "../models/user-role-response.interface";
import { getIcon } from "@shared/functions/helpers";
import { UserRoleRequest } from "../models/user-role-request.interface";

@Injectable({
  providedIn: "root",
})
export class UserRoleService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_USER_ROLES
    }?Records=${size}&Sort=${sort}&Order=${order}&NumPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseApiResponse>(requestUrl)
      .pipe(map((resp) => this.transformUserRoleData(resp)));
  }

  private transformUserRoleData(response: BaseApiResponse): BaseApiResponse {
    const badgeColors: Record<number, string> = {
      0: "text-gray bg-gray-light",
      1: "text-green bg-green-light",
    };

    response.data.forEach((userRole: UserRoleResponse) => {
      userRole.badgeColor =
        badgeColors[userRole.state] || "text-gray bg-gray-light";
      userRole.icEdit = getIcon("icEdit", "Editar Rol de Usuario", true);
      userRole.icDelete = getIcon("icDelete", "Eliminar Rol de Usuario", true);
    });

    return response;
  }

  userRoleById(userRoleId: number): Observable<UserRoleByIdResponse> {
    const requestUrl = `${env.api}${endpoint.USER_ROLE_BY_ID}${userRoleId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseApiResponse) => {
        return resp.data;
      })
    );
  }

  userRoleRegister(userRole: UserRoleRequest): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${endpoint.USER_ROLE_REGISTER}`;
    return this._http.post<BaseApiResponse>(requestUrl, userRole);
  }

  userRoleEdit(
    userRoleId: number,
    userRole: UserRoleRequest
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${endpoint.USER_ROLE_EDIT}${userRoleId}`;
    return this._http.put<BaseApiResponse>(requestUrl, userRole);
  }

  userRoleRemove(userRoleId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.USER_ROLE_REMOVE}${userRoleId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseApiResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
