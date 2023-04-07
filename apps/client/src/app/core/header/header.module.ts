import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavItemVisibleEnum } from '../../shared/navigation/configs/navbar.provider';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,

    NavigationModule.register([
      /* Common items */
      {
        route: 'sign-in',
        title: 'Sign in',
        visible: NavItemVisibleEnum.COMMON,
      },
      {
        route: 'sign-up',
        title: 'Sign up',
        visible: NavItemVisibleEnum.COMMON,
      },
    ]),
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
