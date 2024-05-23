import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { IconService } from "@shared/services/icon.service";

@Component({
  selector: "app-checkbox",
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
})
export class CheckboxComponent implements OnInit {
  @Input() label: string = "";
  @Input() cssLabel: string[] = ["text-sm", "text-am-grey-dark"];
  @Input() sublabel: string = "";
  @Input() cssSublabel: string[] = ["text-xs", "text-am-grey"];
  @Input() positionEnd: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() key: string = "ckeckbox";
  @Input() check: boolean = false;
  @Output() checked = new EventEmitter<any>();

  classSelect: string[] = [];
  classIcon: string[] = [];
  icon;

  constructor(public iconService: IconService) {}

  ngOnInit(): void {
    this.initMode();
  }

  initMode() {
    this.classSelect = this.check
      ? ["bg-am-main-blue-light", "cursor-pointer"]
      : ["hover:bg-am-main-blue-light", "cursor-pointer"];
    this.icon = this.check ? "icCheckBox" : "icCheckBoxOutlineBlank";
    this.classIcon = this.check ? ["text-am-main-blue-dark"] : ["text-gray"];
  }

  changeStatus() {
    let sendStatus: any = {};
    this.check = !this.check;
    sendStatus.check = this.check;
    sendStatus.key = this.key;
    this.checked.emit(sendStatus);
    this.initMode();
  }
}
