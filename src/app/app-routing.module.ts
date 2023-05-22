import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutType } from './core/enums/app-layout.type';
import { authGuardFn } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'login',
    data: {
      layout: AppLayoutType.Center
    },
    loadComponent: () => import('./modules/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuardFn({ redirectTo: ['/login'] })],
    data: {
      layout: AppLayoutType.Sidenav
    },
    loadComponent: () => import('./modules/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'tenants',
    canActivate: [authGuardFn({ redirectTo: ['/login'] })],
    data: {
      layout: AppLayoutType.Sidenav
    },
    loadComponent: () => import('./modules/tenants/tenants.component').then((m) => m.TenantsComponent),
  },
  {
    path: 'users',
    canActivate: [authGuardFn({ redirectTo: ['/login'] })],
    data: {
      layout: AppLayoutType.Sidenav
    },
    loadComponent: () => import('./modules/users/users.component').then((m) => m.UsersComponent),
  },
  {
    path: '**',
    title: '404',
    data: {
      layout: AppLayoutType.Center
    },
    loadComponent: () => import('./modules/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
