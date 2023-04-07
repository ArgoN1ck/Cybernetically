import { Inject, Injectable } from '@angular/core';
import {
  INavItem,
  NavItemVisibleEnum,
  NAV_ITEMS,
} from './configs/navbar.provider';

@Injectable()
export class NavigationService {
  constructor(@Inject(NAV_ITEMS) private navItems: INavItem[]) {}

  getNavItems(): INavItem[] {
    return this.navItems;
  }

  getCommonNavItems(): INavItem[] {
    return this.navItems.filter(
      (item) => item.visible !== NavItemVisibleEnum.AUTH
    );
  }

  getAuthNavItems(): INavItem[] {
    return this.navItems.filter(
      (item) => item.visible !== NavItemVisibleEnum.COMMON
    );
  }
}
