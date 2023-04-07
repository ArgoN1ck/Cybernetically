import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

@NgModule({
  declarations: [SignUpComponent, SignInComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SignUpComponent, SignInComponent],
})
export class AuthModule {}
