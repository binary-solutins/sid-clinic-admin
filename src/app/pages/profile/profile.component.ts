import { Component, OnInit } from '@angular/core';
import { CommonLabelConstants } from 'src/app/constants/LabelConstants';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
    selector: 'app-profile',
    standalone: false,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
    labelConstants: any;
    constructor(
        private readonly shared: SharedService
    ) {}

    ngOnInit(): void {
        this.shared.setData('Profile');
        this.labelConstants = CommonLabelConstants;
    }
}
