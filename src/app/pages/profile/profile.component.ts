import { Component, OnInit } from '@angular/core';
import { CommonLabelConstants } from 'src/app/constants/LabelConstants';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
    labelConstants: any;
    constructor() {}

    ngOnInit(): void {
        this.labelConstants = CommonLabelConstants;
    }
}
