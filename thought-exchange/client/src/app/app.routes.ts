import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { PostListComponent } from './feature/posts/post-list/post-list.component';

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
    path: 'posts',
    component: PostListComponent,
  },
];
