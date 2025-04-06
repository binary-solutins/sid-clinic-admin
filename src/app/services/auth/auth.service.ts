    import { Injectable } from '@angular/core';
    import { StorageKey, StorageService } from '../storage/storage.service';
    import { CommonService } from '../common/common.service';

    @Injectable({
        providedIn: 'root',
    })
    export class AuthService {
        constructor(
            private readonly storageService: StorageService,
            public commonService: CommonService
        ) {}

        /*
        isTokenExpired(): boolean {
            let expireDate = this.storageService.getValue('expireDate');
            return new Date().getTime() > new Date(expireDate).getTime();
        }*/
        
        isLoggedIn(): boolean {
            let token = this.storageService.getValue('JWTToken');
            let currentUser = this.storageService.getValue('userId');

            if (token && currentUser) return true;
            else return false;
        }

        isAccessToAdmin(): boolean {
            let userRole = this.storageService.getValue('role');
            userRole = this.commonService.Decrypt(userRole);
            if (userRole == 'admin') {
                return false;
            } else {
                return true;
            }
        }

        getAccessToken(): any {
            let token = this.storageService.getValue(StorageKey.authToken);
            return token ? token : null;
        }

        getUserId(): any {
            let id = JSON.parse(
                this.storageService.getValue(StorageKey.currentUser)
            ).id;
            return id ? id : null;
        }

        getUserName(): any {
            let name = JSON.parse(
                this.storageService.getValue(StorageKey.currentUser)
            ).username;
            return name ? name : null;
        }

        getUserFullName(): any {
            let name = JSON.parse(
                this.storageService.getValue(StorageKey.currentUser)
            ).userFullName;
            return name ? name : null;
        }
    }
