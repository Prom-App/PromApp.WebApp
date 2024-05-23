import { Injectable } from "@angular/core";
import icMenuDown from "@iconify/icons-ic/baseline-arrow-drop-down";
import icArrowDropDown from "@iconify/icons-ic/round-arrow-drop-down";
import icName from "@iconify/icons-ic/round-badge";
import icClose from "@iconify/icons-ic/round-close";
import icDelete from "@iconify/icons-ic/round-delete";
import icDescription from "@iconify/icons-ic/round-description";
import icEdit from "@iconify/icons-ic/round-edit";
import icSearch from "@iconify/icons-ic/round-search";
import icToday from "@iconify/icons-ic/round-today";
import icRegister from "@iconify/icons-ic/twotone-add";
import icAdd from "@iconify/icons-ic/twotone-add-shopping-cart";
import icRole from "@iconify/icons-ic/twotone-admin-panel-settings";
import icManage from "@iconify/icons-ic/twotone-article";
import icDashboard from "@iconify/icons-ic/twotone-bar-chart";
import icCancel from "@iconify/icons-ic/twotone-block";
import icCalendarMonth from "@iconify/icons-ic/twotone-calendar-today";
import icCategory from "@iconify/icons-ic/twotone-category";
import icCheckBox from "@iconify/icons-ic/twotone-check-box";
import icCheckBoxOutlineBlank from "@iconify/icons-ic/twotone-check-box-outline-blank";
import { default as icCloudDownload, default as icInvoice, default as icTicket } from "@iconify/icons-ic/twotone-cloud-download";
import icProvider from "@iconify/icons-ic/twotone-group";
import icProduct from "@iconify/icons-ic/twotone-inventory-2";
import icLabel from "@iconify/icons-ic/twotone-label";
import icMail from "@iconify/icons-ic/twotone-mail";
import icUser from "@iconify/icons-ic/twotone-manage-accounts";
import icReport from "@iconify/icons-ic/twotone-picture-as-pdf";
import icSales from "@iconify/icons-ic/twotone-point-of-sale";
import icMin from "@iconify/icons-ic/twotone-remove";
import icEventRepeat from "@iconify/icons-ic/twotone-restart-alt";
import icSettings from "@iconify/icons-ic/twotone-settings";
import icUserRole from "@iconify/icons-ic/twotone-supervised-user-circle";
import icClient from "@iconify/icons-ic/twotone-supervisor-account";
import icBack from "@iconify/icons-ic/twotone-undo";
import icUpload from "@iconify/icons-ic/twotone-upload-file";
import icViewHeadline from "@iconify/icons-ic/twotone-view-headline";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import icWarehouse from "@iconify/icons-ic/twotone-widgets";

@Injectable({
  providedIn: "root",
})
export class IconService {
  getIcon(icon: string) {
    if (icon == "icCheckBox") {
      return icCheckBox;
    }
    if (icon == "icCheckBoxOutlineBlank") {
      return icCheckBoxOutlineBlank;
    }
    if (icon == "icUserRole") {
      return icUserRole;
    }
    if (icon == "icRole") {
      return icRole;
    }
    if (icon == "icUser") {
      return icUser;
    }
    if (icon == "icTicket") {
      return icTicket;
    }
    if (icon == "icInvoice") {
      return icInvoice;
    }
    if (icon == "icSettings") {
      return icSettings;
    }
    if (icon == "icReport") {
      return icReport;
    }
    if (icon == "icClient") {
      return icClient;
    }
    if (icon == "icCancel") {
      return icCancel;
    }
    if (icon == "icBack") {
      return icBack;
    }
    if (icon == "icAdd") {
      return icAdd;
    }
    if (icon == "icDashboard") {
      return icDashboard;
    }
    if (icon == "icEdit") {
      return icEdit;
    }
    if (icon == "icDelete") {
      return icDelete;
    }
    if (icon == "icArrowDropDown") {
      return icArrowDropDown;
    }
    if (icon == "icSearch") {
      return icSearch;
    }
    if (icon == "icClose") {
      return icClose;
    }
    if (icon == "icName") {
      return icName;
    }
    if (icon == "icDescription") {
      return icDescription;
    }
    if (icon == "icMail") {
      return icMail;
    }
    if (icon == "icMenuDown") {
      return icMenuDown;
    }
    if (icon == "icVisibility") {
      return icVisibility;
    }
    if (icon == "icVisibilityOff") {
      return icVisibilityOff;
    }
    if (icon == "icLabel") {
      return icLabel;
    }
    if (icon == "icViewHeadline") {
      return icViewHeadline;
    }
    if (icon == "icCalendarMonth") {
      return icCalendarMonth;
    }
    if (icon == "icCategory") {
      return icCategory;
    }
    if (icon == "icProvider") {
      return icProvider;
    }
    if (icon == "icCloudDownload") {
      return icCloudDownload;
    }
    if (icon == "icToday") {
      return icToday;
    }
    if (icon == "icEventRepeat") {
      return icEventRepeat;
    }
    if (icon == "icProduct") {
      return icProduct;
    }
    if (icon == "icUpload") {
      return icUpload;
    }
    if (icon == "icWarehouse") {
      return icWarehouse;
    }
    if (icon == "icManage") {
      return icManage;
    }
    if (icon == "icSales") {
      return icSales;
    }
    if (icon == "icRegister") {
      return icRegister;
    }
    if (icon == "icMin") {
      return icMin;
    }
  }
}
