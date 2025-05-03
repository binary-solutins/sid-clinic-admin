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
}
