import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Route[] = [{ path: '', component: SignInComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignInRoutingModule {}
