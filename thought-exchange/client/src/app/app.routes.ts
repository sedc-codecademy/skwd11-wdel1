import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { PostListComponent } from './feature/posts/post-list/post-list.component';
import { RegisterComponent } from './feature/auth/register/register.component';
import { PostFormComponent } from './feature/posts/post-form/post-form.component';
import { PostDetailsComponent } from './feature/posts/post-details/post-details.component';
import { UserCommentsComponent } from './feature/posts/user-comments/user-comments.component';
import { authGuard, loginGuard } from './core/guards';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [() => loginGuard()],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [() => loginGuard()],
  },
  {
    path: 'posts',
    component: PostListComponent,
    canActivate: [() => authGuard()],
  },
  {
    path: 'posts/create',
    component: PostFormComponent,
    canActivate: [() => authGuard()],
  },
  {
    path: 'posts/edit',
    component: PostFormComponent,
    canActivate: [() => authGuard()],
  },
  {
    path: 'posts/user',
    component: PostListComponent,
    canActivate: [() => authGuard()],
  },
  {
    path: 'posts/user/comments',
    component: UserCommentsComponent,
    canActivate: [() => authGuard()],
  },
  {
    path: 'posts/:id',
    component: PostDetailsComponent,
    canActivate: [() => authGuard()],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
