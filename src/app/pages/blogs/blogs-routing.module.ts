import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { AddEditBlogComponent } from './add-edit-blog/add-edit-blog.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

const routes: Routes = [
    { path: '', component: BlogsComponent },
    { path: 'new-blog', component: AddEditBlogComponent },
    { path: 'edit-blog/:blogId', component: AddEditBlogComponent },
    { path: 'blog-details', component: BlogDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BlogsRoutingModule {}
