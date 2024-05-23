import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { RowClick } from "@shared/models/row-click.interface";
import {
  DateRange,
  SearchFilter,
} from "@shared/models/search-options.interface";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import Swal from "sweetalert2";
import { RoleResponse } from "../../models/role-response.interface";
import { RoleService } from "../../services/role.service";
import { RoleManageComponent } from "../role-manage/role-manage.component";
import { componentSettings } from "./role-list-config";
import { Router } from "@angular/router";

@Component({
  selector: "vex-role-list",
  templateUrl: "./role-list.component.html",
  styleUrls: ["./role-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class RoleListComponent implements OnInit {
  component;

  constructor(
    customTitle: CustomTitleService,
    public _roleService: RoleService,
    private _dialog: MatDialog,
    private _router: Router
  ) {
    customTitle.set("Roles");
  }

  ngOnInit(): void {
    this.component = componentSettings;
  }

  setMenu(value: number) {
    this.component.filters.stateFilter = value;
    this.formatGetInputs();
  }

  search(data: SearchFilter) {
    this.component.filters.numFilter = data.searchValue;
    this.component.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  searchDateRange(date: DateRange) {
    this.component.filters.startDate = date.startDate;
    this.component.filters.endDate = date.endDate;
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = "";

    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }

    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }

    if (
      this.component.filters.startDate != "" &&
      this.component.filters.endDate != ""
    ) {
      str += `&startDate=${this.component.filters.startDate}&endDate=${this.component.filters.endDate}`;
    }

    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
    }

    this.component.getInputs = str;
  }

  // openDialogRegister() {
  //   this._dialog
  //     .open(RoleManageComponent, {
  //       disableClose: true,
  //       width: "400px",
  //       data: { mode: "register" },
  //     })
  //     .afterClosed()
  //     .subscribe((res) => {
  //       if (res) {
  //         this.setGetInputsRoles(true);
  //       }
  //     });
  // }

  newRolePermission() {
    this._router.navigate(["/roles-permisos/crear"]);
  }

  rowClick(rowClick: RowClick<RoleResponse>) {
    let action = rowClick.action;
    let role = rowClick.row;

    switch (action) {
      case "edit":
        this.roleEdit(role);
        break;
      case "remove":
        this.roleRemove(role);
        break;
    }
    return false;
  }

  roleEdit(roleData: RoleResponse) {
    this._router.navigate(["/roles-permisos/editar", roleData.roleId])
  }

  roleRemove(roleData: RoleResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el rol ${roleData.description}?`,
      text: "Se borrará de forma permanente!",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "rgb(210, 155, 253)",
      cancelButtonColor: "rgb(79, 109, 253)",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this._roleService
          .roleRemove(roleData.roleId)
          .subscribe(() => this.setGetInputsRoles(true));
      }
    });
  }

  setGetInputsRoles(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Role?sort=Id&download=true`;
  }

  resetFilters() {
    this.component.filters = { ...this.component.resetFilters };
    this.formatGetInputs();
  }
}
