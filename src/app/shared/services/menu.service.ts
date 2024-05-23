import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseApiResponse } from "@shared/models/base-api-response.interface";
import { MenuResponse } from "@shared/models/menu.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  constructor(private _http: HttpClient) {}

  getMenuByRole(): Observable<MenuResponse[]> {
    const requestUrl = `${env.api}${endpoint.MENU_BY_ROLE}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseApiResponse) => {
        return resp.data;
      })
    );
  }
}
