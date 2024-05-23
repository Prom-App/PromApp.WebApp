import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "@shared/services/alert.service";
import { IconService } from "@shared/services/icon.service";
import { statesSelect } from "src/static-data/configs";
import { RoleRequest } from "../../models/role-request.interface";
import {
  PermissionsByRoleResponse,
  PermissionsResponse,
} from "../../models/role-response.interface";
import { RoleService } from "../../services/role.service";
import { componentSettings } from "../role-list/role-list-config";

@Component({
  selector: "vex-role-manage",
  templateUrl: "./role-manage.component.html",
  styleUrls: ["./role-manage.component.scss"],
})
export class RoleManageComponent implements OnInit {
  icClose = IconService.prototype.getIcon("icClose");
  configs = statesSelect;
  component;
  menuPermissions: PermissionsByRoleResponse[];
  indexMenu = 0;
  permissions: PermissionsResponse[];
  private selectedPermissions: PermissionsResponse[] = [];
  selectedPermissionsList: PermissionsResponse[];

  form: FormGroup;

  roleId?: number = 0;

  initForm(): void {
    this.form = this._fb.group({
      roleId: [""],
      description: ["", Validators.required],
      state: ["", Validators.required],
    });
  }

  constructor(
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _roleService: RoleService,
    private _route: Router,
    public _iconService: IconService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.component = componentSettings;
    this.initForm();
    this._activatedRoute.params.subscribe((params) => {
      this.roleId = params["roleId"];
    });
  }

  // ngOnInit(): void {
  //   let indexMenu = 0;
  //   // if (this.roleId > 0) {
  //     console.log("roleId ", this.roleId)
  //     this.roleId = (this.roleId == undefined ? 0 : this.roleId)
  //     this._roleService.permissionByRoleId(this.roleId).subscribe((resp) => {
  //       this.menuPermissions = resp;
  //       this.setIndexMenu(indexMenu);
  //     });
  //   // }
  // }

  ngOnInit(): void {
    let indexMenu = 0;
    if (this.roleId > 0) {
      this.roleById(this.roleId);
    }
    this.roleId = this.roleId == undefined ? 0 : this.roleId;
    this._roleService.permissionByRoleId(this.roleId).subscribe((resp) => {
      this.menuPermissions = resp;
      this.setIndexMenu(indexMenu);

      // if (this.roleId) {
      //   this.menuPermissions.forEach((menu) => {
      //     menu.permissions.forEach((permission) => {
      //       permission.selected = permission.selected;
      //     });
      //   });
      // }

      // Marca como seleccionados los permisos asignados al rol
      // if (this.roleId) {
      //   this.menuPermissions.forEach((menu) => {
      //     menu.permissions.forEach((permission) => {
      //       permission.selected =
      //         permission.selected || menu.permissions.some((p) => p.selected);
      //     });
      //   });
      // }
    });
  }

  setIndexMenu(indexMenu) {
    this.indexMenu = indexMenu;
    this.permissions = this.menuPermissions[indexMenu].permissions;
  }

  back() {
    this._route.navigate(["roles-permisos"]);
  }

  roleById(roleId: number): void {
    this._roleService.roleById(roleId).subscribe((resp) => {
      this.form.reset({
        roleId: resp.roleId,
        description: resp.description,
        state: resp.state,
      });
    });
  }

  roleSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const roleId = this.roleId;

    if (roleId > 0) {
      this.roleEdit(roleId);
    } else {
      this.roleRegister();
    }
  }

  roleRegister(): void {
    const role: RoleRequest = {
      description: this.form.value.description,
      state: this.form.value.state,
      permissions: this.selectedPermissionsList.map((perm) => {
        return {
          permissionId: perm.permissionId,
          permissionName: perm.permissionName,
          permissionDescription: perm.permissionDescription,
        };
      }),
    };

    this._roleService.roleRegister(role).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._route.navigate(["roles-permisos"]);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }

  roleEdit(roleId: number): void {
    const allPermissions = this.menuPermissions
      .reduce((accumulator, menu) => accumulator.concat(menu.permissions), [])
      .map((permission) => ({
        permissionId: permission.permissionId,
        permissionName: permission.permissionName,
        permissionDescription: permission.permissionDescription,
        selected: permission.selected,
      }));

    const role: RoleRequest = {
      description: this.form.value.description,
      state: this.form.value.state,
      permissions: allPermissions,
    };

    this._roleService.roleEdit(roleId, role).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._route.navigate(["roles-permisos"]);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }

  // roleEdit(roleId: number): void {
  //   const role: RoleRequest = {
  //     description: this.form.value.description,
  //     state: this.form.value.state,
  //     permissions: this.permissions.map((perm) => ({
  //       permissionId: perm.permissionId,
  //       permissionName: perm.permissionName,
  //       permissionDescription: perm.permissionDescription,
  //       selected: perm.selected,
  //     })),
  //   };

  //   this._roleService.roleEdit(roleId, role).subscribe((resp) => {
  //     if (resp.isSuccess) {
  //       this._alert.success("Excelente", resp.message);
  //       this._route.navigate(["roles-permisos"]);
  //     } else {
  //       this._alert.warn("Atención", resp.message);
  //     }
  //   });
  // }

  optionChecked(selectedPermissions: PermissionsResponse) {
    selectedPermissions.selected = !selectedPermissions.selected;
    this.togglePermissionSelection(selectedPermissions);

    this.selectedPermissionsList = this.getSelectedPermissions();
  }

  getSelectedPermissions(): PermissionsResponse[] {
    return this.selectedPermissions;
  }

  togglePermissionSelection(permission: PermissionsResponse) {
    const index = this.selectedPermissions.findIndex(
      (p) => p.permissionName === permission.permissionName
    );

    if (index !== -1) {
      this.selectedPermissions.splice(index, 1);
    } else {
      this.selectedPermissions.push(permission);
    }
  }
}
