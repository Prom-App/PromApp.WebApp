import {Component, inject, NgZone, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "@shared/services/alert.service";
import {NgxSpinnerService} from "ngx-spinner";
import {routing} from "@shared/static-helpers/routing";
import {AccountService} from "../../services/account.service";
import {SharedService} from "@shared/services/shared.service";
import {SelectAutocomplete} from "@shared/models/select-autocomplete.interface";


declare let $: any;

@Component({
    selector: 'app-select-avatar',
    templateUrl: './select-avatar.component.html',
    styleUrls: ['./select-avatar.component.scss'],
})
export class SelectAvatarComponent implements OnInit {

    authService = inject(AuthService);
    avatars: any;
    avatarUrl = '';
    avatarSelect: SelectAutocomplete[];
    private avatarUrlDefault="./assets/img/illustrations/avatar-default.png";

    constructor(private fb: FormBuilder,
                private accountService: AccountService,
                private sharedService: SharedService,
                private _alert: AlertService,
                private spinner: NgxSpinnerService,
                private router: Router
    ) {
        if (!this.authService.userToken) {
            this.router.navigate(["/"]);
        }
    }

    pageTitle = 'Selecciona tu avatar';
    progress: string = '20%';
    form: FormGroup = this.fb.group({
        avatar: ['', [Validators.required,]],
    });

    ngOnInit(): void {
        this.loadAvatarSelect();
        this.form.get('avatar').valueChanges.subscribe(value => {
            this.avatarUrl = this.getAvatar(value);
        });
    }

    getAvatar(avatarIdToFind: number): string {
        if(!this.avatars)
            return this.avatarUrlDefault;

        const avatar = this.avatars.find((a: any) => a.id == avatarIdToFind);
        return avatar ? avatar.url : this.avatarUrlDefault;

    }

    loadAvatarSelect(): void {
        this.sharedService.avatarList().subscribe((resp: [any]) => {
            this.avatars=resp;
            this.avatarSelect = resp.map(item => ({
                id: item.id,
                description: item.nombre,
            }));
        });
    }

    next() {
        if (this.form.invalid) {
            return Object.values(this.form.controls).forEach((controls) => {
                controls.markAllAsTouched();
            });
        }

        this.spinner.show();
        this.accountService.updateAvatarUser(this.form.value.avatar).subscribe(
            (res: any) => {
                this.spinner.hide();
                if (res) {
                    this._alert.success("Exitoso","Se ha guardado tu avatar");
                    this.router.navigate([routing.ACCOUNT_COMPLETE]);
                } else
                    this._alert.error("Error","No se actualizó la información, por favor contacte a un administrador");
            },
            (error: any) => {
                this.spinner.hide();
                this._alert.error("Error","No se logró actualizar la información, Actualiza la página e intenta de nuevo.");
                console.error('Error en la solicitud HTTP:', error);
            }
        );

    }

}
