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
    title: 'wetrack - Login',
  },
  {
    path: 'password-reset/:token',
    data: {
      layout: AppLayoutType.Center
    },
    loadComponent: () => import('./modules/password-reset/password-reset.component').then((m) => m.PasswordResetComponent),
    title: 'wetrack - Reset Password',
  },
  {
    path: 'dashboard',
    canActivate: [authGuardFn({ redirectTo: ['/login'] })],
    data: {
      layout: AppLayoutType.Sidenav
    },
    loadComponent: () => import('./modules/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    title: 'wetrack - Dashboard',
  },
  {
    path: 'calendar',
    canActivate: [authGuardFn({ redirectTo: ['/login'] })],
    data: {
      layout: AppLayoutType.Sidenav
    },
    loadComponent: () => import('./modules/calendar/calendar.component').then((m) => m.CalendarComponent),
    title: 'wetrack - Kalender',
  },
  {
    path: 'tenants',
    canActivate: [authGuardFn({ redirectTo: ['/login'] })],
    data: {
      layout: AppLayoutType.Sidenav
    },
    loadComponent: () => import('./modules/tenants/tenants.component').then((m) => m.TenantsComponent),
    title: 'wetrack - Mandanten',
  },
  {
    path: 'tasks',
    canActivate: [authGuardFn({ redirectTo: ['/login'] })],
    data: {
      layout: AppLayoutType.Sidenav
    },
    loadChildren: () => import('./modules/tasks/tasks.module').then((m) => m.TasksModule),
    title: 'wetrack - Aufgaben/Aufträge',
  },
  {
    path: 'users',
    canActivate: [authGuardFn({ redirectTo: ['/login'] })],
    data: {
      layout: AppLayoutType.Sidenav
    },
    loadComponent: () => import('./modules/users/users.component').then((m) => m.UsersComponent),
    title: 'wetrack - Benutzer',
  },
  {
    path: '**',
    title: 'wetrack - 404',
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
