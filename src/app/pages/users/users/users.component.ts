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

    handleImageError(event: any) {
        if (event.target.src.indexOf('user-default.png') === -1) {
            event.target.src = '../../../../assets/images/user-default.png';
        }
    }

    changeUserActiveStatus() {}

    showUserProfile(id: any) {}

    deleteUser(id: any) {}
}
