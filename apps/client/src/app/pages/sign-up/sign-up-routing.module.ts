import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Route[] = [
  {
    path: '',
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpRoutingModule {}
