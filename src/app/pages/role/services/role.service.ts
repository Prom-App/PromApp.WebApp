import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseApiResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { RoleRequest } from "../models/role-request.interface";
import {
  PermissionsByRoleResponse,
  RoleByIdResponse,
  RoleResponse,
} from "../models/role-response.interface";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  constructor(
    private _http: HttpClient,
    private _alert: AlertService
  ) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_ROLES
    }?Records=${size}&Sort=${sort}&Order=${order}&NumPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseApiResponse>(requestUrl)
      .pipe(map((resp) => this.transformRoleData(resp)));
  }

  private transformRoleData(response: BaseApiResponse): BaseApiResponse {
    const badgeColors: Record<number, string> = {
      0: "text-gray bg-gray-light",
      1: "text-green bg-green-light",
    };

    response.data.forEach((role: RoleResponse) => {
      role.badgeColor = badgeColors[role.state] || "text-gray bg-gray-light";
      role.icEdit = getIcon("icEdit", "Editar Rol", true);
      role.icDelete = getIcon("icDelete", "Eliminar Rol", true);
    });

    return response;
  }

  roleById(roleId: number): Observable<RoleByIdResponse> {
    const requestUrl = `${env.api}${endpoint.ROLE_BY_ID}${roleId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseApiResponse) => {
        return resp.data;
      })
    );
  }

  roleRegister(role: RoleRequest): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${endpoint.ROLE_REGISTER}`;
    return this._http.post<BaseApiResponse>(requestUrl, role);
  }

  roleEdit(roleId: number, role: RoleRequest): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${endpoint.ROLE_EDIT}${roleId}`;
    return this._http.put<BaseApiResponse>(requestUrl, role);
  }

  roleRemove(roleId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.ROLE_REMOVE}${roleId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseApiResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }

  permissionByRoleId(roleId: number): Observable<PermissionsByRoleResponse[]> {
    const requestUrl = `${env.api}${endpoint.PERMISSION_BY_ROLE_ID}${roleId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseApiResponse) => {
        return resp.data;
      })
    );
  }
}
