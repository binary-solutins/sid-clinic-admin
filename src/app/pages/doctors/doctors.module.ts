import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { TableModule } from 'primeng/table';
import { DoctorsComponent } from './doctors/doctors.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { FieldsetModule } from 'primeng/fieldset';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
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
        TagModule,
        FieldsetModule,
        CardModule,
        ConfirmDialogModule
    ],
    providers: [MessageService, ConfirmationService],
})
export class DoctorsModule {}
