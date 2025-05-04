import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiUrlHelper } from 'src/app/common/api-url-helper';
import { CommonLabelConstants } from 'src/app/constants/LabelConstants';
import { CommonService } from 'src/app/services/common/common.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
    selector: 'app-users',
    standalone: false,
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
    labelConstants: any;
    users: any[] = [];
    rowsPerPageOptions: number[] = [5, 10, 25, 100];
    loading: boolean = false;

    constructor(
        private readonly api: ApiUrlHelper,
        private readonly commonService: CommonService,
        private readonly router: Router,
        private readonly messageService: MessageService,
        private readonly shared: SharedService
    ) {}

    ngOnInit(): void {
        this.shared.setData('Users');
        this.labelConstants = CommonLabelConstants;
        this.getUsersList();
        this.loading = true;
    }

    getUsersList() {
        let api = this.api.apiUrl.Users.GetUsersList;
        this.commonService.doGet(api).subscribe({
            next: (res) => {
                if (res.code == 200) {
                    this.users = res.data;
                    this.loading = false;
                } else {
                    this.loading = false;
                    this.messageService.add({
                        severity: 'error',
                        summary: res.message,
                    });
                }
            },
            error: (err: any) => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: err.message,
                });
            },
        });
    }

    downloadTemplate() {
        const link = document.createElement('a');
        link.href = 'assets/templates/Users_Template.xlsx';
        link.download = 'Users_Template.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    importUsers(event: any, fileInput: HTMLInputElement) {
        const file = event.target.files[0];
        if (file) {
            const allowedExtensions = ['.xls', '.xlsx'];
            const fileName = file.name.toLowerCase();
            const isValidExtension = allowedExtensions.some((ext) =>
                fileName.endsWith(ext)
            );
            if (!isValidExtension) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Only Excel files (.xls, .xlsx) are allowed.',
                });
                fileInput.value = '';
                return;
            }
            let api = this.api.apiUrl.Users.ImportUsers;
            const formData = new FormData();
            formData.append('file', file);
            this.loading = true;
            this.commonService.doPost(api, formData).subscribe({
                next: (response) => {
                    this.loading = false;
                    fileInput.value = '';
                    if (response.code == 200) {
                        this.getUsersList();
                        this.messageService.add({
                            severity: 'success',
                            summary: response.message,
                        });
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: response.message,
                        });
                    }
                },
                error: (err) => {
                    this.loading = false;
                    console.error(err);
                    fileInput.value = '';
                },
            });
        }
    }

    handleImageError(event: any) {
        if (event.target.src.indexOf('user-default.png') === -1) {
            event.target.src = '../../../../assets/images/user-default.png';
        }
    }

    changeUserActiveStatus() {}

    showUserProfile(id: any) {}

    deleteUser(id: any) {
        
    }
}
