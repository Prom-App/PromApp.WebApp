import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common"
import { SharedModule } from "@shared/shared.module";
import {SelectAvatarComponent} from "./components/select-avatar/select-avatar.component";
import {AccountRoutingModule} from "./account-routing.module";
import {
    SelectAutocompleteComponent
} from "@shared/components/reusables/select-autocomplete/select-autocomplete.component";
import {CompleteProfileComponent} from "./components/complete-profile/complete-profile.component";

@NgModule({
    declarations: [SelectAvatarComponent,CompleteProfileComponent],
    imports: [CommonModule, SharedModule, AccountRoutingModule, SelectAutocompleteComponent]
})
export class AccountModule {
}
