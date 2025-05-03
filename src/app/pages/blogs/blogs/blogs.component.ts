import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiUrlHelper } from 'src/app/common/api-url-helper';
import {
    BlogLabelConstants,
    CommonLabelConstants,
} from 'src/app/constants/LabelConstants';
import { CommonService } from 'src/app/services/common/common.service';
import { SharedService } from 'src/app/services/shared/shared.service';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    selector: 'app-blogs',
    templateUrl: './blogs.component.html',
    styleUrl: './blogs.component.scss',
})
export class BlogsComponent implements OnInit {
    labelConstants: any;
    blogConstants: any;
    blogs: any = [];
    first: number = 0;
    rows: number = 10;
    rowsPerPageOptions: number[] = [5, 10, 25, 50];
    loading: boolean = true;

    constructor(
        private readonly router: Router,
        private readonly commonService: CommonService,
        private readonly api: ApiUrlHelper,
        private readonly messageService: MessageService,
        private readonly shared: SharedService
    ) {}

    ngOnInit() {
        this.shared.setData('Blogs');
        this.labelConstants = CommonLabelConstants;
        this.blogConstants = BlogLabelConstants;
        this.getBlogsList();
    }

    newBlog() {
        this.router.navigate(['/blogs/new-blog']);
    }

    getBlogsList() {
        let api = this.api.apiUrl.Blogs.GetAllBlogs;
        this.commonService
            .doGet(api)
            .pipe()
            .subscribe({
                next: (res) => {
                    if (res.code == 200) {
                        this.loading = false;
                        this.blogs = res.data.blogs;
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: res.message,
                            life: 3000,
                        });
                        this.loading = false;
                    }
                },
                error: (err: any) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: err,
                        life: 3000,
                    });
                },
            });
    }

    viewBlog(id: any) {
        this.router.navigate([`/blogs/blog-details`], {
            state: {
                blogId: this.commonService.Encrypt(id),
            },
        });
    }

    editBlog(id: any) {
        let blogId = this.commonService.Encrypt(id);
        this.router.navigate([`/blogs/edit-blog/${blogId}`]);
    }

    deleteBlog(id: any) {}

    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }

    changeActiveStatus(blog: any) {
        let api = this.api.apiUrl.Blogs.UpdateBlogActiveStatus(blog.id);
        this.commonService
            .doPut(api, {})
            .pipe()
            .subscribe({
                next: (res) => {
                    if (res.code == 200) {
                        this.messageService.add({
                            severity: 'success',
                            summary: res.message,
                        });
                        this.getBlogsList();
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: res.message,
                        });
                    }
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
    }

    changeFeaturedStatus(blog: any) {
        let api = this.api.apiUrl.Blogs.UpdateBlogFeaturedStatus(blog.id);
        this.commonService
            .doPut(api, {})
            .pipe()
            .subscribe({
                next: (res) => {
                    if (res.code == 200) {
                        this.messageService.add({
                            severity: 'success',
                            summary: res.message,
                        });
                        this.getBlogsList();
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: res.message,
                        });
                    }
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
    }
}
