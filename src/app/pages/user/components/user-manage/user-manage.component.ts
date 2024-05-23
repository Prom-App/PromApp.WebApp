import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "@shared/services/alert.service";
import { IconService } from "@shared/services/icon.service";
import { authTypes, statesSelect } from "src/static-data/configs";
import { UserService } from "../../services/user.service";

@Component({
  selector: "vex-user-manage",
  templateUrl: "./user-manage.component.html",
  styleUrls: ["./user-manage.component.scss"],
})
export class UserManageComponent implements OnInit {
  icClose = IconService.prototype.getIcon("icClose");
  icVisibility = IconService.prototype.getIcon("icVisibility");
  icVisibilityOff = IconService.prototype.getIcon("icVisibilityOff");
  states = statesSelect;
  authTypes = authTypes;
  mode: string = "";
  form: FormGroup;
  inputType = "password";
  visible = false;

  initForm(): void {
    this.form = this._fb.group({
      userId: [0, [Validators.required]],
      userName: ["", [Validators.required]],
      password: [""],
      email: ["", [Validators.required]],
      image: [""],
      authType: [0, [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _userService: UserService,
    public _dialogRef: MatDialogRef<UserManageComponent>,
    private _cd: ChangeDetectorRef
  ) {
    this.mode = data.mode;
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data.mode == "edit") {
      this.userById(this.data.dialogConfig.data.userId);
    }
  }

  selectedImage(file: File) {
    this.form.get("image").setValue(file);
  }

  userById(userId: number): void {
    this._userService.userById(userId).subscribe((resp) => {
      this.form.reset({
        userId: resp.userId,
        userName: resp.userName,
        email: resp.email,
        image: resp.image,
        authType: resp.authType,
        state: resp.state,
      });
    });
  }

  userSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }
    const userId = this.form.get("userId").value;

    if (userId > 0) {
      this.userEdit(userId);
    } else {
      this.userRegister();
    }
  }

  userRegister(): void {
    this._userService.userRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }

  userEdit(userId: number): void {
    this._userService.userEdit(userId, this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = "password";
      this.visible = false;
      this._cd.markForCheck();
    } else {
      this.inputType = "text";
      this.visible = true;
      this._cd.markForCheck();
    }
  }
}
