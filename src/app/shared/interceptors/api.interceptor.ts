import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { AlertService } from "@shared/services/alert.service";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "src/app/pages/auth/services/auth.service";

export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private _alertService: AlertService,
    private _authService: AuthService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 400) {
          this._alertService.error(
            "!Atencion",
            "Estamos experimentando dificultades, porfavor comuniquese con el proveedor"
          );
          this._authService.logout();
        }

        if (err.status == 401) {
          this._alertService.warn(
            "Atencion",
            "Su tiempo en el sistema a expirado, Porfavor volverse a loguear."
          );
          this._authService.logout();
        }

        if (err.status == 403) {
          this._alertService.error(
            "!Atencion",
            "Estamos experimentando dificultades, porfavor comuniquese con el proveedor"
          );
          this._authService.logout();
        }

        if (err.status == 404) {
          this._alertService.error(
            "!Atencion",
            "Estamos experimentando dificultades, porfavor comuniquese con el proveedor"
          );
          this._authService.logout();
        }

        if (err.status == 500) {
          this._alertService.error(
            "Ha ocurrido un error",
            "Ha ocurrido un error inesperado. Por favor vuelva a intentarlo y si persiste debe comunicarse con el administrador."
          );
          this._authService.logout();
        }
        return throwError(err);
      })
    );
  }
}
