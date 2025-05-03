import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsRoutingModule } from './blogs-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { AddEditBlogComponent } from './add-edit-blog/add-edit-blog.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { PaginatorModule } from 'primeng/paginator';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SelectButtonModule } from 'primeng/selectbutton';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { FieldsetModule } from 'primeng/fieldset';

@NgModule({
    declarations: [BlogsComponent, AddEditBlogComponent, BlogDetailsComponent],
    imports: [
        CommonModule,
        BlogsRoutingModule,
        ReactiveFormsModule,
        EditorModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        FileUploadModule,
        PaginatorModule,
        ChipModule,
        ChipsModule,
        ToastModule,
        ProgressSpinnerModule,
        TableModule,
        TagModule,
        SelectButtonModule,
        FieldsetModule,
    ],
    providers: [MessageService],
})
export class BlogsModule {}
