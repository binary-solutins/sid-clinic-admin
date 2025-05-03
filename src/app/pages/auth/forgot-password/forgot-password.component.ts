import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiUrlHelper } from 'src/app/common/api-url-helper';
import { CommonErrorMessages } from 'src/app/constants/ErrorMessages';
import { AuthLabelConstants } from 'src/app/constants/LabelConstants';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CommonService } from 'src/app/services/common/common.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
    selector: 'app-forgot-password',
    standalone: false,
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnInit {
    ForgotPasswordForm!: FormGroup;
    labelConstants: any;
    commonErrors: any;

    constructor(
        private readonly fb: FormBuilder,
        public layoutService: LayoutService,
        private readonly commonService: CommonService,
        private readonly api: ApiUrlHelper,
        private readonly router: Router,
        private readonly messageService: MessageService,
        private readonly storageService: StorageService,
        private readonly shared: SharedService
    ) {
      this.forgotPassword();
    }

    ngOnInit(): void {
        this.shared.setData('Forgot Password');
        this.labelConstants = AuthLabelConstants;
        this.commonErrors = CommonErrorMessages;
        if (localStorage.getItem('JWTToken')) {
            this.router.navigate(['/dashboard']);
        }
    }

    forgotPassword() {
        this.ForgotPasswordForm = this.fb.group({
            phone: [
                '',
                [Validators.required, Validators.pattern('^\\+91\\d{10}$')],
            ],
        });
    }

    get ForgotPasswordFormControls() {
      return this.ForgotPasswordForm.controls;
    }

    submitForgotPasswordForm() {}
}
