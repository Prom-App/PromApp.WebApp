import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-profile-progress-bar',
    templateUrl: './profile-progress-bar.component.html',
    styleUrls: ['./profile-progress-bar.component.scss'],
})
export class ProfileProgressBarComponent {
    @Input() progress: string = '';

}
