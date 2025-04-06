import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrlHelper } from 'src/app/common/api-url-helper';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
    selector: 'app-doctor-profile',
    templateUrl: './doctor-profile.component.html',
    styleUrl: './doctor-profile.component.scss',
})
export class DoctorProfileComponent implements OnInit {
    id: any;
    doctor: any;

    constructor(
        private readonly commonService: CommonService,
        private readonly route: ActivatedRoute,
        private readonly api: ApiUrlHelper,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            const encryptedId = params['id'];
            if (encryptedId) {
                this.id = this.commonService.Decrypt(encryptedId);
                if (this.id) {
                    this.getDoctorProfile();
                } else {
                    this.router.navigate(['/doctors']);
                }
            } else {
                this.router.navigate(['/doctors']);
            }
        });
    }

    getDoctorProfile() {
        let api = this.api.apiUrl.Doctors.GetDoctorProfile(this.id);
        this.commonService
            .doGet(api)
            .pipe()
            .subscribe({
                next: (res) => {
                    this.doctor = res.data;
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
    }
}
