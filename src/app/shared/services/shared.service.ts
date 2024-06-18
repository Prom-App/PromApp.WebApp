import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../environments/environment";
import { Observable } from "rxjs";
import { endpoint } from "@shared/apis/endpoint";
import {catchError, map} from "rxjs/operators";
// import {endpoint, httpOptions} from "../route-helpers/endpoint";
// import {catchError, map, Observable} from "rxjs";

@Injectable({
    providedIn: 'any'
})
export class SharedService {
    constructor(private http: HttpClient) {
    }

    countryList(): Observable<any> {
        const requestUrl:string = `${env.api}${endpoint.COUNTRY_LIST}`;
        return this.http.get<any>(requestUrl).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    country(id:number): Observable<any> {
        const requestUrl:string = `${env.api}${endpoint.COUNTRY}${id}`;
        return this.http.get<any>(requestUrl).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    stateList(): Observable<any> {
        const requestUrl:string = `${env.api}${endpoint.STATE_LIST}`;
        return this.http.get<any>(requestUrl).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    state(id:number): Observable<any> {
        const requestUrl:string = `${env.api}${endpoint.STATE}${id}`;
        return this.http.get<any>(requestUrl).pipe(
            map((res: any) => {
                return res;
            })
        );
    }
    cityList(): Observable<any> {
        const requestUrl:string = `${env.api}${endpoint.CITY_LIST}`;
        return this.http.get<any>(requestUrl).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error: any) => {
                console.error('Error en la solicitud HTTP:', error);
                throw error; // Puedes manejar el error según tus necesidades
            })
        );
    }

    nationalityList(): Observable<any> {
        const requestUrl:string = `${env.api}${endpoint.NATIONALITY_LIST}`;
        return this.http.get<any>(requestUrl).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error: any) => {
                console.error('Error en la solicitud HTTP:', error);
                throw error; // Puedes manejar el error según tus necesidades
            })
        );
    }

    avatarList(): Observable<any> {
        const requestUrl:string = `${env.api}${endpoint.AVATAR_LIST}`;
        return this.http.get<any>(requestUrl).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error: any) => {
                console.error('Error en la solicitud HTTP:', error);
                throw error; // Puedes manejar el error según tus necesidades
            })
        );
    }

    genderList(): Observable<any> {
        const requestUrl:string = `${env.api}${endpoint.GENDER_LIST}`;
        return this.http.get<any>(requestUrl).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error: any) => {
                console.error('Error en la solicitud HTTP:', error);
                throw error; // Puedes manejar el error según tus necesidades
            })
        );
    }

}
