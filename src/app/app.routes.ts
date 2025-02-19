import { Routes } from '@angular/router';
import { autoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: 'protected',
    canActivate: [autoLoginPartialRoutesGuard],
    loadChildren: () => import('./pages/protected/protected.component').then(m => m.ProtectedComponent)
  },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) }
];
