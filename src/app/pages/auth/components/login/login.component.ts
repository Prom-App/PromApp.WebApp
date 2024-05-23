import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IconService } from "@shared/services/icon.service";
import { AuthService } from "../../services/auth.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: "vex-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  inputType = "password";
  visible = false;
  icVisibility = IconService.prototype.getIcon("icVisibility");
  icVisibilityOff = IconService.prototype.getIcon("icVisibilityOff");

  initForm(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required]],
      contrasena: ["", [Validators.required]],
    });
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef,
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
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();

        this.spinner.hide();
      });
    }
    this.authService.login(this.form.value, "Interno").subscribe((resp) => {
      this.spinner.hide();
      if (resp) {
        this.router.navigate(["/"]);
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
}
