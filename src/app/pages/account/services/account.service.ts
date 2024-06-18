import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment as env} from "../../../../environments/environment";
import {AuthService} from "../../auth/services/auth.service";
import { map } from 'rxjs/operators';
import {endpoint} from "@shared/apis/endpoint";
import { Account } from '../models/account.interface';

@Injectable({
    providedIn: 'root',
})
export class AccountService {

    constructor(private http: HttpClient, private authService: AuthService) {
    }

    updateAvatarUser(idAvatar: number) {
        const account: any = {
            idAvatar: idAvatar
        };
        return this.updateUser(account).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    updateUserInfo(account: Account) {
        return this.updateUser(account).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    private updateUser(request: any) {
        const requestUrl = `${env.api}${endpoint.UPDATE_USER}`;

        const authToken = this.authService.userToken;
        if(!authToken || authToken.data == 'null')
            window.location.reload();

        return this.http.post<any>(requestUrl, request).pipe(
            map((res: any) => {
                localStorage.setItem("token", JSON.stringify(res.token));
                return res;
            })
        );
    }
}
