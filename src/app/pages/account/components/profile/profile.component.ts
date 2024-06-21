import {Component} from "@angular/core";
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";
import {routing} from "@shared/static-helpers/routing";
import {TokenService} from "../../services/token.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {

    user: any;

    constructor(private authService: AuthService,
                private token: TokenService,
                private router: Router) {

        if (!this.authService.userToken)
            this.router.navigate([routing.LOGIN]);

        this.user = this.token.getTokenInfo();
        if (!this.user.avatar) {
            this.router.navigate([routing.ACCOUNT_AVATAR]);
            return;
        }

        if (this.user.name.trim() === ""){
            this.router.navigate([routing.ACCOUNT_COMPLETE]);
        }
    }

    pageTitle = 'Perfil';
    avatarUrl = '';
    progress: string = '50%';
}
