import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    private readonly dataSubject = new BehaviorSubject<string>('');
    setData(data: string) {
        this.dataSubject.next(data);
    }
    getData() {
        return this.dataSubject.asObservable();
    }
}
