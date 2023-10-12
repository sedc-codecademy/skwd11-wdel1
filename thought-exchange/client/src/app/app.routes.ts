import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { authGuard, loginGuard } from './core/guards';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./feature/auth/login/login.component').then(
        (c) => c.LoginComponent
      ),
    canActivate: [() => loginGuard()],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./feature/auth/register/register.component').then(
        (c) => c.RegisterComponent
      ),
    canActivate: [() => loginGuard()],
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./feature/posts/post-list/post-list.component').then(
        (c) => c.PostListComponent
      ),
    canActivate: [() => authGuard()],
  },
  {
    path: 'posts/create',
    loadComponent: () =>
      import('./feature/posts/post-form/post-form.component').then(
        (c) => c.PostFormComponent
      ),
    canActivate: [() => authGuard()],
  },
  {
    path: 'posts/edit',
    loadComponent: () =>
      import('./feature/posts/post-form/post-form.component').then(
        (c) => c.PostFormComponent
      ),
    canActivate: [() => authGuard()],
  },
  {
    path: 'posts/user',
    loadComponent: () =>
      import('./feature/posts/post-list/post-list.component').then(
        (c) => c.PostListComponent
      ),
    canActivate: [() => authGuard()],
  },
  {
    path: 'posts/user/comments',
    loadComponent: () =>
      import('./feature/posts/user-comments/user-comments.component').then(
        (c) => c.UserCommentsComponent
      ),
    canActivate: [() => authGuard()],
  },
  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./feature/posts/post-details/post-details.component').then(
        (c) => c.PostDetailsComponent
      ),
    canActivate: [() => authGuard()],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
