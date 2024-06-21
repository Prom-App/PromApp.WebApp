import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    getTokenInfo(): any {
        const token = localStorage.getItem('token'); // Reemplaza con el nombre real de tu token en el almacenamiento local
        if (token) {
            let decodedToken: any;
            decodedToken = jwtDecode.jwtDecode(token);
            return decodedToken;
        } else {
            return null;
        }
    }
}
