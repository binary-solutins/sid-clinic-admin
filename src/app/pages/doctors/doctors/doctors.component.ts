import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiUrlHelper } from 'src/app/common/api-url-helper';
import { CommonLabelConstants } from 'src/app/constants/LabelConstants';
import { CommonService } from 'src/app/services/common/common.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
    selector: 'app-doctors',
    standalone: false,
    templateUrl: './doctors.component.html',
    styleUrl: './doctors.component.scss',
})
export class DoctorsComponent {
    labelConstants: any;
    doctors: any = [];
    rowsPerPageOptions: number[] = [5, 10, 25, 100];
    checked: boolean = true;
    loading: boolean = false;

    activeFilter: 'all' | 'approved' | 'pending' = 'all';

    constructor(
        private readonly api: ApiUrlHelper,
        private readonly commonService: CommonService,
        private readonly router: Router,
        private readonly messageService: MessageService,
        private readonly shared: SharedService,
        private readonly confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.shared.setData('Doctors');
        this.labelConstants = CommonLabelConstants;
        this.getDoctorsList();
        this.loading = true;
    }

    getButtonSeverity(filter: string): string {
        return this.activeFilter === filter ? 'primary' : 'secondary';
    }

    showDoctorProfile(id: any) {
        this.router.navigate(['/doctors/doctor-profile'], {
            state: {
                doctorId: this.commonService.Encrypt(id),
            },
        });
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

    deleteDoctor(doctor: any) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this doctor account?',
            header: `Delete ${doctor.User.name}`,
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'none',
            rejectIcon: 'none',

            accept: () => {
                this.loading = true;
                let api = this.api.apiUrl.Doctors.DeleteDoctor.replace(
                    '{id}',
                    doctor.id
                );
                this.commonService.doDelete(api, doctor.id).subscribe({
                    next: (res) => {
                        this.loading = false;
                        if (res.code == 200) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Doctor account Deleted',
                            });
                            this.getDoctorsList();
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: res.message,
                            });
                        }
                    },
                    error: (err: any) => {
                        console.log(err);
                        this.loading = false;
                    },
                });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'You have rejected',
                });
            },
        });
    }
}
