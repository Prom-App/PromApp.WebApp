import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'app-profile-header',
    templateUrl: './profile-header.component.html',
    styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit {
    @Input() title: string = '';
    @Input() avatarUrl: string = '';
    @Input() progressWidth: string = '';

    ngOnInit(): void {
    }
}
