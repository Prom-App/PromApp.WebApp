import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/pages/auth/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Capturamos nuestro token a partir de nuestro BehaviorSubject
    const userToken: any = this.authService.userToken;
    // Vamos a capturar nuestra nueva variable para obtener el tipo de autenticación
    const typeAuth = localStorage.getItem("authType");
    let authReq = req;
    if (userToken) {
      authReq = authReq.clone({
        setHeaders: {
          Authorization: `Bearer ${userToken}`,
          AuthType: typeAuth || '',
        },
      });
      // Aquí anexamos através de los headers el Bearer Token para ejecutar nuestras apis sin ningun problema ya que sabemos que está protegidas por un token válido.
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${userToken}`,
          // Aquí pasamos una nueva propiedad en nuestro encabezado que será el tipo de autenticación
          AuthType: typeAuth,
        },
      });
    }

    // y finalmente retornamos el request con nuestro header configurado
    return next.handle(authReq);
  }
}
