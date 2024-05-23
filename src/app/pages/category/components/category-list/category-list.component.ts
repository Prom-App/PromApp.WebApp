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
import { CategoryService } from "src/app/pages/category/services/category.service";
import Swal from "sweetalert2";
import { CategoryResponse } from "../../models/category-response.interface";
import { CategoryManageComponent } from "../category-manage/category-manage.component";
import { componentSettings } from "./category-list-config";

@Component({
  selector: "vex-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class CategoryListComponent implements OnInit {
  component;

  constructor(
    customTitle: CustomTitleService,
    public _categoryService: CategoryService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Categorias");
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

    if (this.component.filters.refresh == true) {
      let random = Math.random();
      str += `&refresh=${random}`;
    }

    this.component.getInputs = str;
  }

  openDialogRegister() {
    this._dialog
      .open(CategoryManageComponent, {
        disableClose: true,
        width: "400px",
        data: { mode: "register" }
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsCategories(true);
        }
      });
  }

  rowClick(rowClick: RowClick<CategoryResponse>) {
    let action = rowClick.action;
    let category = rowClick.row;

    switch (action) {
      case "edit":
        this.CategoryEdit(category);
        break;
      case "remove":
        this.CategoryRemove(category);
        break;
    }
    return false;
  }

  CategoryEdit(categoryData: CategoryResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = categoryData;

    let dialogRef = this._dialog.open(CategoryManageComponent, {
      data: { dialogConfig, mode: "edit" },
      disableClose: true,
      width: "400px",
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.setGetInputsCategories(true);
      }
    });
  }

  CategoryRemove(categoryData: CategoryResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar la categoría ${categoryData.name}?`,
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
        this._categoryService
          .CategoryRemove(categoryData.categoryId)
          .subscribe(() => this.setGetInputsCategories(true));
      }
    });
  }

  setGetInputsCategories(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Category?Sort=Id&Download=true`;
  }

  resetFilters() {
    this.component.filters = { ...this.component.resetFilters };
    this.formatGetInputs();
  }
}
