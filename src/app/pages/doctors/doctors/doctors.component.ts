import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SpinnerIcon } from 'primeng/icons/spinner';
import { ApiUrlHelper } from 'src/app/common/api-url-helper';
import { CommonLabelConstants } from 'src/app/constants/LabelConstants';
import { IDoctors } from 'src/app/model/commonModel';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
    selector: 'app-doctors',
    standalone: false,
    templateUrl: './doctors.component.html',
    styleUrl: './doctors.component.scss',
})
export class DoctorsComponent {
    labelConstants: any;
    doctors!: any;
    rowsPerPageOptions: number[] = [5, 10, 25, 100];
    checked: boolean = true;
    loading: boolean = false;

    activeFilter: 'all' | 'approved' | 'pending' = 'all';

    constructor(
        private readonly api: ApiUrlHelper,
        private readonly commonService: CommonService,
        private readonly router: Router,
        private readonly messageService: MessageService
    ) {}

    ngOnInit() {
        this.labelConstants = CommonLabelConstants;
        this.getDoctorsList();
        this.loading = true;
    }

    getButtonSeverity(filter: string): string {
        return this.activeFilter === filter ? 'primary' : 'secondary';
    }

    showDoctorProfile(id: any) {
        const doctorId = this.commonService.Encrypt(id);
        this.router.navigate(['/doctors/doctor-profile', doctorId]);
    }

    getDoctorsList(filter: 'all' | 'approved' | 'pending' = 'all') {
        this.activeFilter = filter;
        let api = '';

        switch (filter) {
            case 'all':
                api = this.api.apiUrl.Doctors.GetDoctorsList;
                break;
            case 'approved':
                api = this.api.apiUrl.Doctors.GetApprovedDoctors;
                break;
            case 'pending':
                api = this.api.apiUrl.Doctors.GetPendingDoctors;
                break;
        }

        this.commonService
            .doGet(api)
            .pipe()
            .subscribe({
                next: (res) => {
                    if (res) {
                        this.loading = false;
                        this.doctors = res;
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'No data found',
                        });
                        this.loading = false;
                    }
                },
                error: (err: any) => {
                    console.log(err);
                    this.loading = false;
                },
            });
    }

    updateDoctorStatus(doctor: any) {
        let api = this.api.apiUrl.Doctors.UpdateDoctorStatus(doctor.id);
        this.commonService
            .doPut(api, {})
            .pipe()
            .subscribe({
                next: (res) => {
                    if (res.code == 200) {
                        this.messageService.add({
                            severity: 'success',
                            summary: res.message,
                        });
                        this.getDoctorsList();
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: res.message,
                        });
                    }
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
    }

    changeDoctorActiveStatus(doctor: any) {
        let api = this.api.apiUrl.Doctors.UpdateDoctorActiveStatus(doctor.id);
        this.commonService
            .doPut(api, {})
            .pipe()
            .subscribe({
                next: (res) => {
                    if (res.code == 200) {
                        this.messageService.add({
                            severity: 'success',
                            summary: res.message,
                        });
                        this.getDoctorsList();
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: res.message,
                        });
                    }
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
    }

    handleImageError(event: any) {
        if (event.target.src.indexOf('user-default.png') === -1) {
            event.target.src = '../../../../assets/images/user-default.png';
        }
    }

    deleteDoctor(id: any) {}
}
