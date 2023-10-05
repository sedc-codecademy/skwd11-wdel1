import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { PostListComponent } from './feature/posts/post-list/post-list.component';
import { RegisterComponent } from './feature/auth/register/register.component';
import { PostFormComponent } from './feature/posts/post-form/post-form.component';
import { PostDetailsComponent } from './feature/posts/post-details/post-details.component';
import { UserCommentsComponent } from './feature/posts/user-comments/user-comments.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'posts',
    component: PostListComponent,
  },
  {
    path: 'posts/create',
    component: PostFormComponent,
  },
  {
    path: 'posts/user',
    component: PostListComponent,
  },
  {
    path: 'posts/user/comments',
    component: UserCommentsComponent,
  },
  {
    path: 'posts/:id',
    component: PostDetailsComponent,
  },
];
