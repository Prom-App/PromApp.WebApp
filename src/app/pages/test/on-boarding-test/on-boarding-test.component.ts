import {Component, inject} from "@angular/core";

import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {TestService} from "../services/test.service";
import {AlertService} from "@shared/services/alert.service";
import {NgxSpinnerService} from "ngx-spinner";
import {routing} from "@shared/static-helpers/routing";

@Component({
    selector: 'app-on-boarding-test',
    templateUrl: './on-boarding-test.component.html',
    styleUrls: ['./on-boarding-test.component.scss'],
})
export class OnBoardingTestComponent {

    //testService = inject(TestService);
    router = inject(Router);
    test: any;
    imagePathBase: string = './assets/img/backgrounds/back-';
    testForm: FormGroup;
    currentIndex: number = 0;
    nameTest: string = 'OnBoarding';
    testResult: any[any];

    constructor(private formBuilder: FormBuilder,
                private _alert: AlertService,
                private spinner: NgxSpinnerService,
                private testService: TestService
    ) {
        this.spinner.show();
        this.testService.test('OnBoarding').subscribe(
            (resp: any) => {
                this.test = resp;
                this.testResult = resp.preguntas.map((x: any) => ({
                    idPregunta: x.id,
                    Pregunta: x.enunciado,
                    idsRespuesta: [],
                    respuestas: []
                }));
                this.setCurrentBackgroundImage();
                this.spinner.hide();
            }
        );
        this.testForm = this.formBuilder.group({
            //respuestas: ['', Validators.required]
        });
    }

    onRadioChange(preguntaId: number, respuesta: any) {
        const index = this.testResult.findIndex((x: any) => x.idPregunta === preguntaId);
        if (index !== -1) {
            this.testResult[index].idsRespuesta = [];
            this.testResult[index].idsRespuesta.push(respuesta.id);
            this.testResult[index].respuestas = [];
            this.testResult[index].respuestas.push(respuesta.enunciado);
            this.testResult[index].respuestaSeleccionada = respuesta.id;
        }
    }

    isRespuestaSeleccionada(preguntaId: number, respuestaId: number): boolean {
        const index = this.testResult.findIndex((x: any) => x.idPregunta === preguntaId);
        return index !== -1 && this.testResult[index].respuestaSeleccionada === respuestaId;
    }

    isCurrentChecked() {
        return this.testResult[this.currentIndex].respuestaSeleccionada;
    }

    nextQuestion() {
        this.currentIndex = (this.currentIndex + 1) % this.test.preguntas?.length;
    }

    prevQuestion() {
        this.currentIndex = (this.currentIndex - 1) % this.test.preguntas?.length;
    }

    setCurrentBackgroundImage() {
        const currentImageIndex = this.currentIndex + 1;
        const imagePath = `${this.imagePathBase}${currentImageIndex}.png`;
        document.getElementById('body')!.style.background = `url("${imagePath}")`;
    }

    submitForm() {
        if (!this.testForm.valid) {
            this._alert.warn("Revisar", "Aun no has respondido todas las preguntas");
        } else {
            this.spinner.show();
            this.testService.saveTest(this.nameTest, this.testResult).subscribe(
                (res: string) => {
                    this.spinner.hide();
                    if (res) {
                        this._alert.success("Finalizado", "Se ha enviado el test");
                        this.router.navigate([routing.ACCOUNT_AVATAR]);
                    } else
                        this._alert.error("Error", "No se guardó la información, por favor contacte a un administrador");
                },
                (error: any) => {
                    this.spinner.hide();
                    console.error('Error en la solicitud HTTP:', error);
                    //this.toastr.error("Error en la solicitud. Por favor, inténtelo de nuevo o contacte a un administrador.");
                }
            );
        }
    }

}
