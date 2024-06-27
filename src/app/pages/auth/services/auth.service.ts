import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {endpoint, httpOptions} from "@shared/apis/endpoint";
import {BaseApiResponse} from "@shared/models/base-api-response.interface";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {environment as env} from "src/environments/environment";
import {Login} from "../models/login.interface";
import {Register} from "../models/register.interface";
import {AlertService} from "@shared/services/alert.service";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private user: BehaviorSubject<BaseApiResponse>;

    public get userToken(): BaseApiResponse {
        return this.user.value;
    }

    constructor(private http: HttpClient,
                private _alert: AlertService
    ) {
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

    register(request: Register): Observable<any> {
        const requestUrl = `${env.api}${endpoint.REGISTER}`;
        return this.http.post<any>(requestUrl, request, httpOptions).pipe(
            map((res: any) => {
                if (res) {
                    localStorage.setItem("token", JSON.stringify(res.token));
                    this.user.next(res.token);
                }
                return res;
            }),
            catchError((error) => {
                // this.logError(error);
                return error;
            })
        );
    }

    logError(error: any): void {
        console.error('Error en la conexión al servicio:', error);
        if (error.status === 404) {
            this._alert.error("Conexión fallida","Usuario no encontrado");
        } else if (error.status === 400) {
            this._alert.error("Conexión fallida","Usuario/contraseña no válidos");
        } else {
            if (error.error.mensajes)
                this._alert.error("Conexión fallida",error.error.mensajes[0]);
            else
                this._alert.error("Conexión fallida", "No se pudo iniciar sesión, por favor inténtalo de nuevo más tarde");
        }
        this.user.next(null);
    }

    loginWithGoogle(
        credencial: string,
        tipoAutenticacion: string
    ): Observable<BaseApiResponse> {
        const request: any = {
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
