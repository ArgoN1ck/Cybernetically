import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignInRoutingModule } from './sign-in-routing.module';
import { AuthModule } from '../../modules/auth/auth.module';

@NgModule({
  declarations: [SignInComponent],
  imports: [CommonModule, SignInRoutingModule, AuthModule],
})
export class SignInModule {}
