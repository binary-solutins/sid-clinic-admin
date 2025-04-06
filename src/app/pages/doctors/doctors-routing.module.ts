import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';

const routes: Routes = [
    {
        path: '',
        component: DoctorsComponent,
    },
    {
        path: 'doctor-profile/:id',
        component: DoctorProfileComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DoctorsRoutingModule {}
