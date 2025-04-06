import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-chart-pie',
                        routerLink: ['/dashboard'],
                    },
                ],
            },
            {
                label: 'Doctors',
                items: [
                    {
                        label: 'Doctors List',
                        icon: 'pi pi-fw pi-building',
                        routerLink: ['/doctors'],
                    },
                    {
                        label: 'Doctor Support',
                        icon: 'pi pi-comment',
                        routerLink: ['/doctors-support'],
                    }
                ],
            },
            {
                label: 'Users',
                items: [
                    {
                        label: 'Users List',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/users'],
                    },
                    {
                        label: 'User Support',
                        icon: 'pi pi-comments',
                        routerLink: ['/users-support'],
                    },
                ],
            },
            {
                label: 'Pages',
                items: [
                    {
                        label: 'Blogs',
                        icon: 'pi pi-pencil',
                        routerLink: ['/blogs'],
                    },
                    {
                        label: 'Notifications',
                        icon: 'pi pi-bell',
                        routerLink: ['/notifications'],
                    },
                    {
                        label: 'Coupons',
                        icon: 'pi pi-tags',
                        routerLink: ['/coupons'],
                    },
                    {
                        label: 'Images',
                        icon: 'pi pi-images',
                        routerLink: ['/images']
                    }
                ],
            },
        ];
    }
}
