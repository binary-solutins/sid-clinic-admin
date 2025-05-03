import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiUrlHelper } from 'src/app/common/api-url-helper';
import { CommonErrorMessages } from 'src/app/constants/ErrorMessages';
import { AuthLabelConstants } from 'src/app/constants/LabelConstants';
import { CommonService } from 'src/app/services/common/common.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
    selector: 'app-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent implements OnInit {
    checked: boolean = false;
    LoginForm: FormGroup;
    submitted: boolean = false;
    labelConstants: any;
    commonErrors: any;

    constructor(
        private readonly fb: FormBuilder,
        private readonly commonService: CommonService,
        private readonly api: ApiUrlHelper,
        private readonly router: Router,
        private readonly messageService: MessageService,
        private readonly storageService: StorageService,
        private readonly shared: SharedService
    ) {
        this.loginForm();
    }

    ngOnInit(): void {
        this.shared.setData('Login');
        this.labelConstants = AuthLabelConstants;
        this.commonErrors = CommonErrorMessages;
        if (localStorage.getItem('JWTToken')) {
            this.router.navigate(['/dashboard']);
        }
    }

    loginForm() {
        this.LoginForm = this.fb.group({
            phone: [
                '',
                [Validators.required, Validators.pattern('^\\+91\\d{10}$')],
            ],
            password: ['', Validators.required],
            rememberMe: [false],
        });
    }

    get getLoginFormControls() {
        return this.LoginForm.controls;
    }

    submitLoginForm() {
        this.submitted = true;
        this.commonService.checkFormValidations(this.LoginForm);
        if (this.LoginForm.valid) {
            this.submitted = false;

            let api = this.api.apiUrl.Auhtentication.Login;
            this.commonService
                .doPost(api, this.LoginForm.value)
                .pipe()
                .subscribe({
                    next: (response) => {
                        if (response.code == 200) {
                            this.LoginForm.reset();
                            this.router.navigate(['/dashboard']);
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Authenticated',
                                detail: 'Signed In Successfully',
                            });
                            this.storageService.setValue(
                                'JWTToken',
                                response.data.token
                            );
                            this.storageService.setValue(
                                'role',
                                response.data.role
                            );
                        }
                    },
                    error: (loginError: any) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Signin Fail',
                            detail: 'Credentials do not match',
                        });
                    },
                });
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Invalid Input',
                detail: 'Please fill valid details',
            });
        }
    }
}
