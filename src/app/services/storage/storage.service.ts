import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    getValue(key: string): any {
        return localStorage.getItem(key);
    }

    setValue(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    removeValue(key: string): void {
        localStorage.removeItem(key);
    }

    clearStorage(): void {
        localStorage.clear();
    }
}

export class StorageKey {
  public static readonly userId = 'userId'
  public static readonly currentUser = 'currentUser';
  public static readonly userfullname = 'userfullname';
  public static readonly authToken = 'JWTToken';
  public static readonly expireDate:'expireDate';
  public static readonly currentUserId = 'currentUserId';
  public static readonly adminProfilePicture = 'adminProfilePicture';
}