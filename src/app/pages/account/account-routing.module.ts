import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {SelectAvatarComponent} from "./components/select-avatar/select-avatar.component";
import {routing} from "@shared/static-helpers/routing";
import {CompleteProfileComponent} from "./components/complete-profile/complete-profile.component";

const routes: Routes = [
    {
        path: routing.ACCOUNT_AVATAR,
        component: SelectAvatarComponent,
        data: { title: "Avatar" },
    },
    {
        path: routing.ACCOUNT_COMPLETE,
        component: CompleteProfileComponent,
        data: { title: "Completar Perfil" },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountRoutingModule {}
