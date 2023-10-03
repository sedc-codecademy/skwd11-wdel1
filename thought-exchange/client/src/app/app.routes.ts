import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { PostListComponent } from './feature/posts/post-list/post-list.component';
import { RegisterComponent } from './feature/auth/register/register.component';

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
];
