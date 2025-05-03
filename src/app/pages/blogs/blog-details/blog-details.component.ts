import { Location } from '@angular/common';
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

@Component({
    selector: 'app-blog-details',
    standalone: false,
    templateUrl: './blog-details.component.html',
    styleUrl: './blog-details.component.scss',
})
export class BlogDetailsComponent implements OnInit {
    blogId: any;
    blog: any;
    imgSrc: any;
    labelConstants: any;
    commonConstants: any;
    activeStatusOptions = [
        { label: 'Active', value: true },
        { label: 'Suspend', value: false },
    ];

    constructor(
        private readonly shared: SharedService,
        private readonly commonService: CommonService,
        private readonly router: Router,
        private readonly api: ApiUrlHelper,
        private readonly location: Location,
        private readonly messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.commonConstants = CommonLabelConstants;
        this.labelConstants = BlogLabelConstants;
        this.shared.setData('Blog Details');
        const id = window.history.state?.blogId;
        this.blogId = this.commonService.Decrypt(id);
        this.getBlogDetails();
    }

    getBlogDetails() {
        let api = this.api.apiUrl.Blogs.GetBlogDetails.replace(
            '{id}',
            this.blogId
        );
        this.commonService
            .doGet(api)
            .pipe()
            .subscribe({
                next: (res) => {
                    if (res.code == 200) {
                        this.blog = res.data;
                        this.imgSrc = res.data.coverImage;
                    } else {
                        this.location.back();
                        this.messageService.add({
                            severity: 'error',
                            summary: res.message,
                        });
                    }
                },
                error: (err: any) => {},
            });
    }

    handleImageError(event: any) {
        this.imgSrc = '../../../../assets/images/blog-default.jpg';
    }

    goBack() {
        this.location.back();
    }

    editBlog(blog) {
        this.router.navigate(['/blogs/edit-blog'], {
            state: {
                blogId: blog.blogId,
            },
        });
    }
}
