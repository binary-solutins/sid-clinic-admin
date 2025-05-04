import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Product } from '../../demo/api/product';
import { ProductService } from '../../demo/service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ApiUrlHelper } from 'src/app/common/api-url-helper';
import { CommonService } from 'src/app/services/common/common.service';
import { DashboardLabelConstants } from 'src/app/constants/LabelConstants';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    dashboardLabels: any;
    customersCount: number;
    doctorsCount: number;
    data: any;

    options: any;

    constructor(
        private readonly shared: SharedService,
        private readonly api: ApiUrlHelper,
        private readonly commonService: CommonService,
        private readonly messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.shared.setData('Dashboard');
        this.dashboardLabels = DashboardLabelConstants;
        this.getDashboardData();
        this.getChartData();
    }

    getDashboardData() {
        let api = this.api.apiUrl.Dashboard.GetCounts;
        this.commonService
            .doGet(api)
            .pipe()
            .subscribe({
                next: (response: any) => {
                    this.customersCount = response.data.customerCount;
                    this.doctorsCount = response.data.doctorCount;
                },
                error: (err: any) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Signin Fail',
                        detail: 'Credentials do not match',
                    });
                },
            });
    }

    getChartData() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        this.data = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
            ],
            datasets: [
                {
                    label: 'Doctors',
                    data: [30, 40, 33, 50, 90, 110, -150],
                    fill: false,
                    tension: 0.4,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    backgroundColor: 'rgba(167, 248, 255, 0.2)',
                },
                {
                    label: 'Users',
                    data: [20, 40, 80, 35, 110, 220, -400],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--orange-500'),
                    tension: 0.4,
                    backgroundColor: 'rgba(255,167,38,0.2)',
                },
            ],
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
            },
        };
    }
}
