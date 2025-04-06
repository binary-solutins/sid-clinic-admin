import { AbstractControl } from '@angular/forms';

export class PasswordMatcher {
    static match(control: AbstractControl): void | null {
        const passwordControl = control.get('UserPassword');
        const confirmPasswordControl = control.get('ConfirmPassword');

        if (passwordControl?.pristine || confirmPasswordControl?.pristine) {
            return null;
        }

        if (passwordControl?.value === confirmPasswordControl?.value) {
            return null;
        }

        confirmPasswordControl?.setErrors({ match: true });
    }
}
