import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard, NoAuthGuard } from './modules/auth/guards/auth.guard';

const routes: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'sign-up',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./pages/sign-up/sign-up.module').then((m) => m.SignUpModule),
  },
  {
    path: 'sign-in',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./pages/sign-in/sign-in.module').then((m) => m.SignInModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
