import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {IconService} from "@shared/services/icon.service";
import {AuthService} from "../../services/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {helpers} from "@shared/static-helpers/helpers";
import {routing} from "@shared/static-helpers/routing";
import {AlertService} from "@shared/services/alert.service";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
    selector: "vex-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    registerForm: FormGroup;
    loginTitle = 'Bienvenido';
    loginSubTitle = 'Tiempo sin vernos ya te extrañabamos';
    backgroundImageUrl = './assets/img/backgrounds/login-background.png';
    imgShow: boolean = true;
    inputType = "password";
    visible = false;
    icVisibility = IconService.prototype.getIcon("icVisibility");
    icVisibilityOff = IconService.prototype.getIcon("icVisibilityOff");

    initForm(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            contrasena: ["", [Validators.required]],
        });

        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            contrasena: ['', [Validators.required, Validators.pattern(helpers.passwordPattern)]],
            confirmaContrasena: ['', [Validators.required]]
        });
    }

    onTabChange(event: MatTabChangeEvent) {
        if (event.index === 0) {
            this.animateChanges("Bienvenido", "Tiempo sin vernos ya te extrañabamos", "./assets/img/backgrounds/login-background.png", true);
        } else {
            this.animateChanges("Crea tu cuenta", "¡Empecemos!", "./assets/img/backgrounds/register-background.png", false);
        }
    }

    animateChanges(newTitle: string, newSubTitle: string, newBackgroundImageUrl: string, imgShow: boolean) {
        const elementsToFadeOut = document.querySelectorAll('.animate-transition');
        elementsToFadeOut.forEach(element => {
            (element as HTMLElement).style.opacity = '0';
        });

        setTimeout(() => {
            this.backgroundImageUrl = newBackgroundImageUrl;
            this.loginTitle = newTitle;
            this.loginSubTitle = newSubTitle;
            this.imgShow = imgShow;

            setTimeout(() => {
                elementsToFadeOut.forEach(element => {
                    (element as HTMLElement).style.opacity = '1';
                });
            }, 50);
        }, 150);
    }

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private cd: ChangeDetectorRef,
        private _alert: AlertService,
        private spinner: NgxSpinnerService
    ) {
        if (this.authService.userToken) {
            this.router.navigate(["/"]);
        }
    }

    ngOnInit(): void {
        this.initForm();
    }

    login(): void {
        this.spinner.show();
        if (this.loginForm.invalid) {
            return Object.values(this.loginForm.controls).forEach((controls) => {
                controls.markAllAsTouched();

                this.spinner.hide();
            });
        }
        this.authService.login(this.loginForm.value, "Interno").subscribe((resp) => {
            this.spinner.hide();
            if (resp) {
                this.router.navigate(["/"]);
            }
        });
    }

    confirmPasswordValidator(registerForm: FormGroup): { [key: string]: boolean } | null {
        let password: any;
        password = registerForm.value.contrasena;
        const confirmPassword = registerForm.value.confirmaContrasena;
        return password === confirmPassword ? null : {'notMatch': true};
    }

    register() {
        this.spinner.show();
        if (this.confirmPasswordValidator(this.registerForm) != null) {
            this.spinner.hide();
            this._alert.error("Algo salió mal", "Las contraseñas no coinciden");
        }

        if (this.registerForm.invalid) {
            return Object.values(this.registerForm.controls).forEach((controls) => {
                controls.markAllAsTouched();
                this.spinner.hide();
            });
        }

        this.authService.register(this.registerForm.value).subscribe(() => {
            this.spinner.hide();
            this._alert.success("Conectado", "Ingresando");
            this.router.navigate([routing.PROFILE_INTRO]);
        });
    }

    toggleVisibility() {
        if (this.visible) {
            this.inputType = "password";
            this.visible = false;
            this.cd.markForCheck();
        } else {
            this.inputType = "text";
            this.visible = true;
            this.cd.markForCheck();
        }
    }
}
