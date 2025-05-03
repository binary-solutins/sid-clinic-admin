import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../service/app.layout.service';
import { CommonLabelConstants } from 'src/app/constants/LabelConstants';
import { AppService } from 'src/app/services/app/app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    commonLabels = CommonLabelConstants;
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private readonly appService: AppService,
        private readonly router: Router
    ) {}

    takeToDashboard() {
        this.router.navigate(['/dashboard']);
    }

    myProfile() {
        this.router.navigate(['/profile']);
    }

    logout() {
        this.appService.logout();
    }
}
