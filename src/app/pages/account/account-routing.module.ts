import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import {VexRoutes} from "../../../@vex/interfaces/vex-route.interface";
import {SelectAvatarComponent} from "./components/select-avatar/select-avatar.component";
import {CompleteProfileComponent} from "./components/complete-profile/complete-profile.component";
import {ProfileComponent} from "./components/profile/profile.component";

const routes: VexRoutes = [
    {
        path: '',
        component: ProfileComponent,
    },
    {
        path: 'avatar',
        component: SelectAvatarComponent,
        data: { title: "Avatar" },
    },
    {
        path: 'completar',
        component: CompleteProfileComponent,
        data: { title: "Completar Perfil" },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountRoutingModule {}
