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
    ) {
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras?.state) {
            this.id = navigation.extras.state['doctorId'];
        }
    }

    ngOnInit(): void {
        if (this.id) {
            this.getDoctorProfile();
        } else {
            // If no ID is found in state, navigate back to doctors list
            this.router.navigate(['/doctors']);
        }
    }

    getDoctorProfile() {
        let api = this.api.apiUrl.Doctors.GetDoctorProfile(this.id);
        this.commonService
            .doGet(api)
            .pipe()
            .subscribe({
                next: (res) => {
                    console.log(res.data);
                    this.doctor = res.data;
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
    }
}
