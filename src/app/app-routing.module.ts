import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { PageNotFoundComponent } from './pages/auth/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guard/auth/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    redirectTo: 'login',
                    pathMatch: 'full',
                },
                {
                    path: 'login',
                    component: LoginComponent,
                },
                {
                    path: 'forgot-password',
                    component: ForgotPasswordComponent,
                },
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: 'dashboard',
                            loadChildren: () =>
                                import(
                                    './pages/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'pages',
                            loadChildren: () =>
                                import(
                                    './demo/components/pages/pages.module'
                                ).then((m) => m.PagesModule),
                        },
                        {
                            path: 'users',
                            loadChildren: () =>
                                import('./pages/users/users.module').then(
                                    (m) => m.UsersModule
                                ),
                        },
                        {
                            path: 'doctors',
                            loadChildren: () =>
                                import('./pages/doctors/doctors.module').then(
                                    (m) => m.DoctorsModule
                                ),
                        },
                        {
                            path: 'profile',
                            component: ProfileComponent,
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./demo/components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                {
                    path: 'notfound',
                    component: NotfoundComponent,
                },
                {
                    path: 'page-not-found',
                    component: PageNotFoundComponent,
                },
                {
                    path: '**',
                    redirectTo: '/notfound',
                },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
