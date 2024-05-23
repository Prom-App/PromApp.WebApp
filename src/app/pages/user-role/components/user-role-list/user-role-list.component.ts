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
import { UserRoleResponse } from "../../models/user-role-response.interface";
import { UserRoleService } from "../../services/user-role.service";
import { UserRoleManageComponent } from "../user-role-manage/user-role-manage.component";
import { componentSettings } from "./user-role-config";

@Component({
  selector: "vex-user-role-list",
  templateUrl: "./user-role-list.component.html",
  styleUrls: ["./user-role-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class UserRoleListComponent implements OnInit {
  component;

  constructor(
    customTitle: CustomTitleService,
    public _userRoleService: UserRoleService,
    private _dialog: MatDialog
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

  openDialogRegister() {
    this._dialog
      .open(UserRoleManageComponent, {
        disableClose: true,
        width: "400px",
        data: { mode: "register" },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsUserRoles(true);
        }
      });
  }

  rowClick(rowClick: RowClick<UserRoleResponse>) {
    let action = rowClick.action;
    let userRole = rowClick.row;

    switch (action) {
      case "edit":
        this.userRoleEdit(userRole);
        break;
      case "remove":
        this.userRoleRemove(userRole);
        break;
    }
    return false;
  }

  userRoleEdit(userRoleData: UserRoleResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = userRoleData;

    this._dialog
      .open(UserRoleManageComponent, {
        data: { dialogConfig, mode: "edit" },
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsUserRoles(true);
        }
      });
  }

  userRoleRemove(userRoleData: UserRoleResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el rol del usuario ${userRoleData.user}?`,
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
        this._userRoleService
          .userRoleRemove(userRoleData.userRoleId)
          .subscribe(() => this.setGetInputsUserRoles(true));
      }
    });
  }

  setGetInputsUserRoles(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `UserRole?sort=Id&download=true`;
  }

  resetFilters() {
    this.component.filters = { ...this.component.resetFilters };
    this.formatGetInputs();
  }
}
