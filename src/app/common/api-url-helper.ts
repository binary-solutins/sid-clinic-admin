import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ApiUrlHelper {
    public apiUrl = {
        Dashboard: {
            GetCounts: 'dashboard/getDashboardCardData',
        },
        Auhtentication: {
            Login: 'auth/login',
            Logout: 'auth/logout',
            ChangePassword: 'auth/change-password',
            Profile: '/auth/profile',
        },
        Doctors: {
            GetDoctorsList: 'doctors/all',
            GetDoctorsListByCity: (city: string) => `doctors/city/${city}`,
            UpdateDoctorStatus: (id: number | string) =>
                `doctors/approve/${id}`,
            GetApprovedDoctors: 'doctors/approved',
            GetPendingDoctors: 'doctors/pending',
            GetDoctorProfile: (id: number | string) => `doctors/details/${id}`,
            UpdateDoctorActiveStatus: (id: number | string) =>
                `doctors/toggle-status/${id}`,
            DeleteDoctor: 'doctor',
        },
        Users: {
            GetUsersList: 'users/all',
            AddUser: 'user',
            EditUser: '',
            DeleteUser: '',
            ImportUsers: 'users/import',
        },
        Blogs: {
            GetAllBlogs: 'blogs/blogsAdmin',
            GetActiveBlogs: 'blogs',
            GetBlogDetails: 'blogs/{id}',
            EditBlog: 'blogs/{id}',
            AddNewBlog: 'blogs',
            UpdateBlogActiveStatus: (id: number | string) =>
                `blogs/${id}/toggle-status`,
            UpdateBlogFeaturedStatus: (id: number | string) =>
                `blogs/${id}/toggle-featured`,
            DeleteBlog: 'blogs/{id}',
        },
    };
}
