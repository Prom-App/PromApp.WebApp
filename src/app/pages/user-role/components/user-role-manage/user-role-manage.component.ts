import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SelectAutocomplete } from "@shared/models/select-autocomplete.interface";
import { AlertService } from "@shared/services/alert.service";
import { IconService } from "@shared/services/icon.service";
import { RoleSelectService } from "@shared/services/role-select.service";
import { UserSelectService } from "@shared/services/user-select.service";
import { statesSelect } from "src/static-data/configs";
import { UserRoleService } from "../../services/user-role.service";

@Component({
  selector: "vex-user-role-manage",
  templateUrl: "./user-role-manage.component.html",
  styleUrls: ["./user-role-manage.component.scss"],
})
export class UserRoleManageComponent implements OnInit {
  icClose = IconService.prototype.getIcon("icClose");
  configs = statesSelect;
  userSelect: SelectAutocomplete[];
  roleSelect: SelectAutocomplete[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      userRoleId: [0, [Validators.required]],
      roleId: ["", [Validators.required]],
      userId: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _userRoleService: UserRoleService,
    public _dialogRef: MatDialogRef<UserRoleManageComponent>,
    private _userSelectService: UserSelectService,
    private _roleSelectService: RoleSelectService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectUsers();
    this.listSelectRoles();
    if (this.data.mode == "edit") {
      this.userRoleById(this.data.dialogConfig.data.userRoleId);
    }
  }

  userRoleById(userRoleId: number): void {
    this._userRoleService.userRoleById(userRoleId).subscribe((resp) => {
      this.listSelectUsers();
      this.listSelectRoles();
      this.form.reset({
        userRoleId: resp.userRoleId,
        userId: resp.userId,
        roleId: resp.roleId,
        state: resp.state,
      });
    });
  }

  listSelectUsers(): void {
    this._userSelectService.listSelectUsers().subscribe((resp) => {
      this.userSelect = resp;
    });
  }

  listSelectRoles(): void {
    this._roleSelectService.listSelectRoles().subscribe((resp) => {
      this.roleSelect = resp;
    });
  }

  userRoleSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const userRoleId = this.form.get("userRoleId").value;

    if (userRoleId > 0) {
      this.userRoleEdit(userRoleId);
    } else {
      this.userRoleRegister();
    }
  }

  userRoleRegister(): void {
    this._userRoleService
      .userRoleRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  userRoleEdit(userRoleId: number): void {
    this._userRoleService
      .userRoleEdit(userRoleId, this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }
}
