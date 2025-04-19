import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { TableModule } from 'primeng/table';
import { DoctorsComponent } from './doctors/doctors.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';

@NgModule({
    declarations: [DoctorsComponent, DoctorProfileComponent],
    imports: [
        CommonModule,
        DoctorsRoutingModule,
        TableModule,
        ToggleButtonModule,
        FormsModule,
        ButtonModule,
        InputSwitchModule,
        ToastModule,
        ProgressSpinnerModule,
        BlockUIModule,
    ],
    providers: [MessageService],
})
export class DoctorsModule {}
