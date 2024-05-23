import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/pages/auth/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    // Aquí en nuestro guard nos vamos a subscribir a nuestro BehaviorSubject para obtener su valor actual en este caso la intención es capturar el token
    const user = this.authService.userToken;

    // Y simplemente retornamos un true si existe dicho token|||
    if (user) {
      // Con esto ya vamos a saber que tenemos el permiso para dicha ruta que está protegida
      return true;
    }
    // Aquí por defecto ps cuando no tenga sesión el usuario quiero que cargue|||| la ruta del login|||| que por ahora no existe
    this.router.navigate(["/login"]);
    // y retornamos un false para simular de que el usuario no tenga sesión
    return false;
  }
}
