import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

    activeFilter: 'all' | 'approved' | 'pending' = 'all';

    constructor(
        private readonly api: ApiUrlHelper,
        private readonly commonService: CommonService,
        private readonly router: Router
    ) {}

    ngOnInit() {
        this.labelConstants = CommonLabelConstants;
        this.getDoctorsList();
    }

    getButtonSeverity(filter: string): string {
        return this.activeFilter === filter ? 'primary' : 'secondary';
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
                    this.doctors = res;
                    console.log(res);
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
    }

    getDoctorImage(doctor: any) {
        if (doctor.doctorPhoto.trim()) {
            return doctor.doctorPhoto;
        }
        return '../../../../assets/images/user-default.png';
    }

    updateDoctorStatus(doctor: any) {
        let api = this.api.apiUrl.Doctors.UpdateDoctorStatus(doctor.id);
        this.commonService
            .doPut(api, {})
            .pipe()
            .subscribe({
                next: (res) => {
                    if (res.code == 200) {
                        this.getDoctorsList();
                        console.log(
                            'Doctor status updated:',
                            doctor.isApproved
                        );
                    }
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
    }

    deleteDoctor(id: any) {
        console.log('Delete' + id);
    }
}
