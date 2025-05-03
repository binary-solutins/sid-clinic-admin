import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { ApiUrlHelper } from 'src/app/common/api-url-helper';
import { BlogLabelConstants } from 'src/app/constants/LabelConstants';
import { CommonService } from 'src/app/services/common/common.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
    selector: 'app-add-edit-blog',
    templateUrl: './add-edit-blog.component.html',
    styleUrls: ['./add-edit-blog.component.scss'],
})
export class AddEditBlogComponent implements OnInit {
    labelConstants: any;
    blogForm!: FormGroup;
    id: any;
    blog: any = {}; // Initialize as empty object
    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
    coverImagePreview: string | ArrayBuffer | null = null;
    stateOptions: any[] = [
        { label: 'Yes', value: 'off' },
        { label: 'No', value: 'on' },
    ];

    constructor(
        private readonly fb: FormBuilder,
        private readonly location: Location,
        private readonly messageService: MessageService,
        private readonly api: ApiUrlHelper,
        private readonly commonService: CommonService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly shared: SharedService,
    ) {}

    ngOnInit() {
        this.shared.setData('Add Blog');
        this.labelConstants = BlogLabelConstants;
        this.initializeBlogForm();

        this.route.params.subscribe((params) => {
            const encryptedId = params['blogId'];
            if (encryptedId) {
                this.id = this.commonService.Decrypt(encryptedId);
                if (this.id) {
                    this.getBlogDetails();
                } else {
                    this.router.navigate(['/blogs']);
                }
            }
        });
    }

    initializeBlogForm() {
        this.blogForm = this.fb.group({
            title: ['', Validators.required],
            content: ['', Validators.required],
            coverImage: [null],
            category: ['', Validators.required],
            tags: [[]],
            isFeatured: [false],
        });
    }

    get blogFormControls() {
        return this.blogForm.controls;
    }

    getBlogDetails() {
        let api = this.api.apiUrl.Blogs.GetBlogDetails.replace('{id}', this.id);
        this.commonService.doGet(api).subscribe({
            next: (res) => {
                if (res.code == 200) {
                    this.blog = res.data;
                    this.blogForm.patchValue({
                        title: this.blog.title,
                        content: this.blog.content,
                        category: this.blog.category,
                        tags: this.blog.tags || [],
                        isFeatured: this.blog.isFeatured || false,
                    });
                    if (this.blog.coverImage) {
                        this.coverImagePreview = this.blog.coverImage;
                    }
                    this.shared.setData('Edit Blog');
                }
            },
            error: (err: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load blog details',
                });
                this.router.navigate(['/blogs']);
            },
        });
    }

    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.blogForm.patchValue({ coverImage: file });
            this.blogForm.get('coverImage')?.updateValueAndValidity();

            const reader = new FileReader();
            reader.onload = () => {
                this.coverImagePreview = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }

    removeCoverImage(): void {
        this.coverImagePreview = null;
        this.blogForm.patchValue({ coverImage: null });
    }

    addEditBlog() {
        if (this.blogForm.invalid) {
            this.blogForm.markAllAsTouched();
            this.messageService.add({
                severity: 'error',
                summary: 'Invalid Details',
                detail: 'Fill all the fields required',
            });
            return;
        }
        const formData = new FormData();

        formData.append('title', this.blogForm.value.title);
        formData.append('category', this.blogForm.value.category);
        formData.append('content', this.blogForm.value.content);
        formData.append('isFeatured', String(this.blogForm.value.isFeatured));
        formData.append('tags', JSON.stringify(this.blogForm.value.tags));
        formData.append('status', 'published');

        if (this.blogForm.value.coverImage instanceof File) {
            formData.append(
                'coverImage',
                this.blogForm.value.coverImage,
                this.blogForm.value.coverImage.name
            );
        }

        const isEdit = this.blog.id > 0;
        const api = isEdit
            ? this.api.apiUrl.Blogs.EditBlog.replace('{id}', this.blog.id)
            : this.api.apiUrl.Blogs.AddNewBlog;
        const httpCall = isEdit
            ? this.commonService.doPut
            : this.commonService.doPost;

        httpCall.call(this.commonService, api, formData).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: isEdit
                        ? 'Blog edited successfully'
                        : 'Blog created successfully',
                });
                this.blogForm.reset();
                this.router.navigate(['/blogs']);
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail:
                        err.error?.message ||
                        (isEdit
                            ? 'Failed to edit blog'
                            : 'Failed to create blog'),
                });
            },
        });
    }

    goBack() {
        this.location.back();
    }
}
