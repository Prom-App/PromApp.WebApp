import { Component, NgZone, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// Importamos la interfaces que usaremos para poder enviar las credenciales y mostrar el one tap de google
import { BaseApiResponse } from "@shared/models/base-api-response.interface";
import { CredentialResponse, PromptMomentNotification } from "google-one-tap";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../../services/auth.service";

declare var window: any;
declare var google: any;

@Component({
  selector: "app-login-google",
  templateUrl: "./login-google.component.html",
  styleUrls: ["./login-google.component.scss"],
})
export class LoginGoogleComponent implements OnInit {
  private user: BehaviorSubject<BaseApiResponse>;

  public get userToken(): BaseApiResponse {
    return this.user.value;
  }

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService
  ) {
    this.user = new BehaviorSubject<BaseApiResponse>(
      JSON.parse(localStorage.getItem("token"))
    );
  }

  private clientId = environment.clientId;

  ngOnInit(): void {
    window.onGoogleLibraryLoad = () => {
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: false,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonGoogle")!,
        {
          theme: "filled_blue",
          type: "standard",
          size: "large",
          text: "continue_with",
          shape: "square",
          width: 300,
          auto_select: "true",
        }
      );
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    };
  }

  async handleCredentialResponse(response: CredentialResponse) {
    await this.authService
      .loginWithGoogle(response.credential, "Externo")
      .subscribe(
        (resp: BaseApiResponse) => {
          if (resp.isSuccess) {
            this.ngZone.run(() => {
              this.router.navigate(["/"]);
            });
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
