import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint, httpOptions } from "@shared/apis/endpoint";
import { BaseApiResponse } from "@shared/models/base-api-response.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { Login } from "../models/login.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private user: BehaviorSubject<BaseApiResponse>;

  public get userToken(): BaseApiResponse {
    return this.user.value;
  }

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<BaseApiResponse>(
      JSON.parse(localStorage.getItem("token"))
    );
  }

  login(req: Login, authType: string): Observable<any> {
    localStorage.setItem("authType", "Interno");
    const requestUrl = `${env.api}${endpoint.LOGIN}?authType=${authType}`;
    return this.http.post<BaseApiResponse>(requestUrl, req, httpOptions).pipe(
      map((res: any) => {
        if (res) {
          localStorage.setItem("token", JSON.stringify(res.token));
          this.user.next(res.token);
        }
        return res;
      })
    );
  }

  loginWithGoogle(
    credencial: string,
    tipoAutenticacion: string
  ): Observable<BaseApiResponse> {
    const request: any= {
      credencial: credencial,
      tipoAutenticacion: "Externo"
    };
    localStorage.setItem("authType", tipoAutenticacion);
    const requestUrl = `${env.api}${endpoint.LOGIN_GOOGLE}`;
    return this.http
      .post<BaseApiResponse>(requestUrl, JSON.stringify(request), httpOptions)
      .pipe(
        map((resp: BaseApiResponse) => {
          if (resp.isSuccess) {
            localStorage.setItem("token", JSON.stringify(resp.data.token));
            this.user.next(resp.data.token);
          }
          return resp;
        })
      );
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("authType");
    this.user.next(null);
    window.location.reload();
  }
}
