import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
    selector: 'app-coupons',
    standalone: false,
    templateUrl: './coupons.component.html',
    styleUrl: './coupons.component.scss',
})
export class CouponsComponent implements OnInit {
    constructor(
        private readonly shared: SharedService,
        private readonly commonService: CommonService
    ) {}

    ngOnInit(): void {
      this.shared.setData('Coupons');
    }
}
