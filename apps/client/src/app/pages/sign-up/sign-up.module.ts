import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { AuthModule } from '../../modules/auth/auth.module';

@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, SignUpRoutingModule, AuthModule],
})
export class SignUpModule {}
