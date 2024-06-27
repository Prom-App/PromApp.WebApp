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
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

@Component({
    selector: 'vex-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    registerForm: FormGroup;
    loginTitle = 'Bienvenido';
    loginSubTitle = 'Tiempo sin vernos ya te extrañabamos';
    backgroundImageUrl = './assets/img/backgrounds/login-background.png';
    imgShow = true;
    inputType = 'password';
    visible = false;
    icVisibility = IconService.prototype.getIcon('icVisibility');
    icVisibilityOff = IconService.prototype.getIcon('icVisibilityOff');
    errorLogin = '';
    errorRegister = '';

    initForm(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            contrasena: ['', [Validators.required]],
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
        this.authService.login(this.loginForm.value, "Interno").pipe(
            catchError(error => {
                this.spinner.hide();
                this.errorLogin = 'Usuario y/o contraseña incorrectos';
                return of(null);
            })
        ).subscribe((resp) => {
            this.spinner.hide();
            if (resp) {
                this._alert.success("Conectado", "Ingresando");
                this.router.navigate([routing.ACCOUNT]);
            }
        });
    }

    confirmPasswordValidator(registerForm: FormGroup): { [key: string]: boolean } | null {
        let password: any;
        password = registerForm.value.contrasena;
        const confirmPassword = registerForm.value.confirmaContrasena;
        return password === confirmPassword ? null : {notMatch: true};
    }

    register() {
        this.spinner.show();
        if (this.confirmPasswordValidator(this.registerForm) != null) {
            this.errorRegister = 'Las contraseñas no coinciden';
            this.spinner.hide();
            return;
        }

        if (this.registerForm.invalid) {
            return Object.values(this.registerForm.controls).forEach((controls) => {
                controls.markAllAsTouched();
                this.spinner.hide();
                return;
            });
        }

        this.authService.register(this.registerForm.value).pipe(
            catchError(error => {
                this.spinner.hide();
                this.errorRegister = 'No se pudo crear la cuenta.';
                return of(null);
            })
        ).subscribe((resp: any) => {
            this.spinner.hide();
            if (resp) {
                this._alert.success("Conectado", "Ingresando");
                this.router.navigate([routing.ON_BOARDING_TEST]);
            }
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

    hasUpper() {
        return /[A-Z]/.test(this.registerForm.value.contrasena);
    }

    hasLower() {
        return /[a-z]/.test(this.registerForm.value.contrasena);
    }

    hasNumber() {
        return /\d/.test(this.registerForm.value.contrasena);
    }

    hasSpecial() {
        return /[!@#$%^&*(),.?":{}|<>]/.test(this.registerForm.value.contrasena);
    }

    minLength() {
        return this.registerForm.value.contrasena.length >= 8;
    }

    tooltip(): string {
        const messages = [];
        if (!this.minLength()) {
            messages.push('Mínimo 8 caracteres');
        }
        if (!this.hasUpper()) {
            messages.push('Al menos una mayúscula');
        }
        if (!this.hasLower()) {
            messages.push('Al menos una minúscula');
        }
        if (!this.hasNumber()) {
            messages.push('Al menos un número');
        }

        let mess=messages.join("\n");
        return mess;
    }
}
