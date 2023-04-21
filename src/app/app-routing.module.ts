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
    loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent),
 },
 {
   path: 'dashboard',
   canActivate: [authGuardFn({ redirectTo: ['/login'] })],
   data: { 
     layout: AppLayoutType.Sidenav
   }, 
   loadComponent: () => import('./components/dashboard/dashboard.component').then((m) => m.DashboardComponent),
 },
 {
  path: '**',
  title: '404',
  data: { 
    layout: AppLayoutType.Center
  }, 
  loadComponent: () => import('./components/not-found/not-found.component').then((m) => m.NotFoundComponent),
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
