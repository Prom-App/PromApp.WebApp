import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DocumentType } from "@shared/models/document-type.interface";
import { AlertService } from "@shared/services/alert.service";
import { IconService } from "@shared/services/icon.service";
import * as configs from "../../../../../static-data/configs";
import { ProviderService } from "../../services/provider.service";
import { DocumentTypeService } from "./../../../../shared/services/document-type.service";

@Component({
  selector: "vex-provider-manage",
  templateUrl: "./provider-manage.component.html",
  styleUrls: ["./provider-manage.component.scss"],
})
export class ProviderManageComponent implements OnInit {
  icClose = IconService.prototype.getIcon("icClose");
  // icArrowDropDown = IconService.prototype.getIcon("icArrowDropDown");
  configs = configs;

  // optionsDocumentType: any[];
  documentTypes: DocumentType[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      providerId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      documentTypeId: ["", [Validators.required]],
      documentNumber: ["", [Validators.required]],
      address: [""],
      phone: [""],
      state: ["", [Validators.required]],
    });
    // this.form.get("documentTypeId").valueChanges.subscribe((resp) => {
    //   this.filterDataDocumentType(resp);
    // });
  }

  // filterDataDocumentType(data) {
  //   this.optionsDocumentType = this.documentTypes.filter((item) => {
  //     return (
  //       item.abbreviation
  //         .toLowerCase()
  //         .indexOf(data.toString().toLowerCase()) === 0
  //     );
  //   });
  // }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _providerService: ProviderService,
    public _dialogRef: MatDialogRef<ProviderManageComponent>,
    private _documentTypeService: DocumentTypeService
  ) {
    this.initForm();
    // this.documentTypes = data.documentTypes;
    // this.optionsDocumentType = data.documentTypes;
  }

  ngOnInit(): void {
    this.listDocumentTypes();
    if (this.data.mode == "edit") {
      this.providerById(this.data.dialogConfig.data.providerId);
    }
  }

  listDocumentTypes(): void {
    this._documentTypeService.listDocumentTypes().subscribe((resp) => {
      this.documentTypes = resp;
      // this.optionsDocumentType = resp;
    });
  }

  providerById(providerId: number): void {
    this._providerService.providerById(providerId).subscribe((resp) => {
      this.form.reset({
        providerId: resp.providerId,
        name: resp.name,
        email: resp.email,
        documentTypeId: resp.documentTypeId,
        documentNumber: resp.documentNumber,
        address: resp.address,
        phone: resp.phone,
        state: resp.state,
      });
    });
  }

  providerSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const providerId = this.form.get("providerId").value;

    if (providerId > 0) {
      this.providerEdit(providerId);
    } else {
      this.providerRegister();
    }
  }

  providerRegister(): void {
    this._providerService
      .providerRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  providerEdit(providerId: number): void {
    this._providerService
      .providerEdit(providerId, this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  // showDropdrown(documentTypeId: number) {
  //   let selectValue = null;
  //   if (documentTypeId) {
  //     let option = this.documentTypes.find(
  //       (item) => item.documentTypeId === documentTypeId
  //     );
  //     selectValue = option != undefined ? option.abbreviation : null;
  //   }
  //   return selectValue;
  // }

  // clearSelectDocumentType() {
  //   this.form.get("documentTypeId").setValue("");
  // }
}
