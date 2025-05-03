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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { FieldsetModule } from 'primeng/fieldset';
@NgModule({
    declarations: [
        DoctorsComponent,
        DoctorProfileComponent
    ],
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
        CardModule
    ],
    providers: [MessageService]
})
export class DoctorsModule {}
