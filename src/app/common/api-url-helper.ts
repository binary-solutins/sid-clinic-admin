import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ApiUrlHelper {
    public apiUrl = {
        Dashboard: {
            GetCounts: 'dashboard/getDashboardCardData',
        },
        Auhtentication: {
            Login: 'auth/login',
            Logout: 'auth/logout',
            ChangePassword: 'auth/change-password',
            Profile: '/auth/profile',
        },
        Doctors: {
            GetDoctorsList: 'doctors/all',
            UpdateDoctorStatus: (id: number | string) =>
                `doctors/approve/${id}`,
            GetApprovedDoctors: 'doctors/approved',
            GetPendingDoctors: 'doctors/pending',
            GetDoctorProfile: (id: number | string) => `doctors/details/${id}`,
        },
    };
}
