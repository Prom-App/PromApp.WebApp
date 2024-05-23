import { Component, EventEmitter, Output } from "@angular/core";
import { IconService } from "@shared/services/icon.service";
import { SharedModule } from "@shared/shared.module";

@Component({
  selector: "app-button-reset-filters",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./button-reset-filters.component.html",
  styleUrls: ["./button-reset-filters.component.scss"],
})
export class ButtonResetFiltersComponent {
  @Output() buttonClick = new EventEmitter<void>();
  icEventRepeat = IconService.prototype.getIcon("icEventRepeat");

  emitClick() {
    return this.buttonClick.emit();
  }
}
