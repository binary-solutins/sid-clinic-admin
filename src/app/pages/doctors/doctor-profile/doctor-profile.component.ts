import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiUrlHelper } from 'src/app/common/api-url-helper';
import { CommonLabelConstants } from 'src/app/constants/LabelConstants';
import { CommonService } from 'src/app/services/common/common.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
    selector: 'app-doctor-profile',
    templateUrl: './doctor-profile.component.html',
    styleUrl: './doctor-profile.component.scss',
})
export class DoctorProfileComponent implements OnInit {
    labelConstants: any;
    id: any;
    doctor: any;
    pfp: any;

    constructor(
        private readonly commonService: CommonService,
        private readonly route: ActivatedRoute,
        private readonly api: ApiUrlHelper,
        private readonly router: Router,
        private readonly shared: SharedService,
        private readonly messageService: MessageService,
        private readonly location: Location
    ) {}

    ngOnInit(): void {
        this.labelConstants = CommonLabelConstants;
        this.shared.setData('Doctor Profile');
        const doctorId = window.history.state?.doctorId;
        this.id = this.commonService.Decrypt(doctorId);
        this.getDoctorProfile();
    }

    getDoctorProfile() {
        let api = this.api.apiUrl.Doctors.GetDoctorProfile(this.id);
        this.commonService
            .doGet(api)
            .pipe()
            .subscribe({
                next: (res) => {
                    if (res.code == 200) {
                        this.doctor = res.data;
                        this.pfp = res.data.doctorPhoto;
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: res.message,
                        });
                        this.location.back();
                    }
                },
                error: (err: any) => {
                    console.log(err);
                    this.location.back();
                },
            });
    }

    handleImageError($event: any) {
        this.pfp = '../../../../assets/images/user-default.png'
    }
}
