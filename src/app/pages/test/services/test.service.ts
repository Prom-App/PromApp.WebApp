import {Injectable} from '@angular/core';
import {environment as env} from "../../../../environments/environment";
import {endpoint} from "@shared/apis/endpoint"
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../auth/services/auth.service";
import {catchError, map} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class TestService {
    constructor(private http: HttpClient, private authService: AuthService) {
    }

    test(name: string): Observable<any> {
        const requestUrl: string = `${env.api}${endpoint.TEST_BY_NAME}${name}`;
        return this.http.get(requestUrl).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                console.error('Error en la solicitud HTTP:', error);
                throw error;
            })
        );
    }

    // mbtiResult(){
    //     const requestUrl: string = `${env.api}${endpoint.MBTI_RESULT}`;
    //     const authToken = this.authService.userSession;
    //     if(!authToken || authToken=='null')
    //         window.location.reload();
    //
    //     const headers = new HttpHeaders({
    //         Authorization: `Bearer ${authToken}`,
    //     });
    //     return this.http.get<any>(requestUrl,{headers}).pipe(
    //         map((res: any) => {
    //             return res;
    //         })
    //     );
    // }

    autoSaveTest(nameTest: string, results: any) {

        let request = {
            nombreTest: nameTest,
            finalizado: false,
            respuestas: results
        };
        return this.save(request).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    saveTest(nameTest: string, results: any) {
        let request = {
            nombreTest: nameTest,
            finalizado: true,
            respuestas: results
        };
        return this.save(request).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    private save(request: any) {
        const requestUrl = `${env.api}${endpoint.SAVE_TEST}`;

        // const authToken = this.authService.userToken.data.token;
        // if(!authToken || authToken=='null')
        //     window.location.reload();
        //
        // const headers = new HttpHeaders({
        //     Authorization: `Bearer ${authToken}`,
        // });
        return this.http.post<any>(requestUrl, request).pipe(
            map((res: any) => {
                return res;
            })
        );
    }
}
