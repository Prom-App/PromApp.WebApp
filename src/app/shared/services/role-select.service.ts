import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseApiResponse } from "@shared/models/base-api-response.interface";
import { SelectAutocomplete } from "@shared/models/select-autocomplete.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RoleSelectService {
  constructor(private _http: HttpClient) {}

  listSelectRoles(): Observable<SelectAutocomplete[]> {
    const requestUrl = `${env.api}${endpoint.LIST_SELECT_ROLES}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseApiResponse) => {
        return resp.data;
      })
    );
  }
}
