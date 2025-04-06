import { NgModule } from '@angular/core';
import {
    HashLocationStrategy,
    LocationStrategy,
    PathLocationStrategy,
} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { LoginComponent } from './pages/auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HTTPListener, HTTPStatus } from './interceptor/HTTPListener';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent, NotfoundComponent, LoginComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        ReactiveFormsModule,
        ToastModule,
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
        HTTPStatus,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HTTPListener,
            multi: true, 
        },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        MessageService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
