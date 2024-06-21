import {Component, inject, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";
import {AccountService} from "../../services/account.service";
import {Account} from "../../models/account.interface";
import {SharedService} from "@shared/services/shared.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertService} from "@shared/services/alert.service";
import {routing} from "@shared/static-helpers/routing";
import {IconService} from "@shared/services/icon.service";
import {SelectAutocomplete} from "@shared/models/select-autocomplete.interface";

declare let $: any;

@Component({
    selector: 'app-complete-profile',
    templateUrl: './complete-profile.component.html',
    styleUrls: ['./complete-profile.component.scss'],
})
export class CompleteProfileComponent implements OnInit {
    countrySelect: SelectAutocomplete[];
    stateSelect: SelectAutocomplete[];
    citySelect: SelectAutocomplete[];
    schoolSelect: SelectAutocomplete[];
    nationalitySelect: SelectAutocomplete[];
    genderSelect: SelectAutocomplete[];
    gradeSelect: SelectAutocomplete[];
    grades = [
        "Doctorado",
        "Maestría",
        "Posgrado",
        "Pregrado",
        "2° Año - Universidad",
        "1° Año - Universidad",
        "Grado 12 - Secundaria",
        "Grado 11 - Secundaria",
        "Grado 10 - Secundaria",
        "Grado 9 - Secundaria"
    ];

    accountService = inject(AccountService);

    icToday = IconService.prototype.getIcon("icToday");
    hasValue = false;
    placeholderText = 'Fecha de Nacimiento';

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private sharedServices: SharedService,
                private router: Router,
                private spinner: NgxSpinnerService,
                private alert: AlertService) {

        if (!this.authService.userToken) {
            this.router.navigate(["/"]);
        }

        // this.avatarUrl = this.token.getTokenInfo().avatar;

    }

    pageTitle = 'Completa tu perfil';
    progress: string = '40%';
    avatarUrl: string = '';

    form: FormGroup = this.fb.group({
        nombre: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        edad: ['', [Validators.required]],
        nacionalidad: ['', [Validators.required]],
        nacionalidad2: [''],
        direccion: ['', [Validators.required]],
        pais: ['', [Validators.required]],
        estado: ['', [Validators.required]],
        ciudad: ['', [Validators.required]],
        genero: ['', [Validators.required]],
        colegio: ['', [Validators.required]],
        escolaridad: ['', [Validators.required]],
    });

    ngOnInit(): void {
        this.form.get('pais')?.valueChanges.subscribe((newValue) => {
            this.onCountryChange(newValue);
        });

        this.form.get('estado')?.valueChanges.subscribe((newValue) => {
            this.onStateChange(newValue);
        });
        this.loadSelects();
    }

    nationalityValidator(controlName: string, control: AbstractControl): { [key: string]: boolean } | null {
        const nationality = this.form.value[controlName];
        const nationality2 = control.value;
        return nationality === nationality2 ? null : {'notMatch': true};
    }

    onCountryChange(value: number) {
        if (value) {
            this.sharedServices.country(value).subscribe(
                (resp: any) => {
                    const states: any[] = resp.departamentos;
                    this.stateSelect = states.map(item => ({
                        id: item.id,
                        description: item.nombre,
                    }));
                    let dataColegio = resp.colegios.map((i: any) => ({
                        id: i.id,
                        description: i.nombre
                    }));
                    dataColegio.push({
                        id: 0,
                        description: 'No encontrado'
                    });
                    this.schoolSelect=dataColegio;
                }
            );
        }
    }

    onStateChange(value: number) {
        if (value) {
            this.sharedServices.state(value).subscribe(
                (resp: any) => {
                    const states: any[] = resp.ciudades;
                    this.citySelect = states.map(item => ({
                        id: item.id,
                        description: item.nombre,
                    }));
                }
            );
        }
    }

    onBirthdayChange(elem: HTMLInputElement) {
        if (this.form.value['edad'] != '') {

            this.hasValue = true;
            elem.classList.add('date-selected');
        } else {
            this.hasValue = false;
            elem.classList.remove('has-value-style');
        }

    }

    loadSelects(): void {
        this.sharedServices.countryList().subscribe(
            (resp: any[]) => {
                this.countrySelect= resp.map(item => ({
                    id: item.id,
                    description: item.iso2 + ' - ' + item.nombre,
                }));
            }
        );

        this.sharedServices.nationalityList().subscribe(
            (resp: any[]) => {
                this.nationalitySelect = resp.map(item => ({
                    id: item.id,
                    description: item.nacionalidad,
                }));
            }
        );

        this.sharedServices.genderList().subscribe(
            (resp: any[]) => {
                this.genderSelect = resp.map(item => ({
                    id: item.id,
                    description: item.tipoGenero,
                }));
            }
        );

        this.gradeSelect= this.grades.map(item=>({
            id: item,
            description : item
        }));
    }

    next() {
        if (this.form.invalid) {
            return Object.values(this.form.controls).forEach((controls) => {
                controls.markAllAsTouched();
            });
        }

        const account: Account = {
            nombre: this.form.value?.nombre,
            telefono: this.form.value?.telefono,
            fechaNacimiento: this.form.value?.edad,
            direccion: this.form.value?.direccion,
            idAvatar: 0,
            idCiudad: this.form.value?.ciudad,
            idGenero: this.form.value?.genero,
            email: "",
            idNacionalidad: this.form.value?.nacionalidad,
            idNacionalidad2: this.form.value?.nacionalidad2,
            idColegio: this.form.value?.colegio,
            gradoEscolar: this.form.value?.escolaridad,
        };


        this.spinner.show();
        this.accountService.updateUserInfo(account).subscribe(
            (res: any) => {
                this.spinner.hide();
                if (res) {
                    this.alert.success("Exitoso","Se ha actualizado la información");
                    this.router.navigate([routing.ACCOUNT]);
                } else
                    this.alert.error("Error","No se actualizó la información, por favor contacte a un administrador");
            },
            (error: any) => {
                this.spinner.hide();
                this.alert.error("Error","No se logró actualizar la información, Actualiza la página e intenta de nuevo.");
                console.error('Error en la solicitud HTTP:', error);
            }
        );
    }
}
