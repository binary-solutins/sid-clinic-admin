import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
    selector: 'app-page-not-found',
    standalone: true,
    imports: [],
    templateUrl: './page-not-found.component.html',
    styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent implements OnInit {
    constructor(private readonly shared: SharedService) {}

    ngOnInit(): void {
        this.shared.setData('Not Found');
    }
}
