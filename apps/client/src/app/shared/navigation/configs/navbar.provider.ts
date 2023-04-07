import { InjectionToken } from '@angular/core';

export enum NavItemVisibleEnum {
  AUTH,
  COMMON,
  ROOT,
}

export interface INavItem {
  title: string;
  route: string;
  img?: string;
  visible: NavItemVisibleEnum;
}

export const NAV_ITEMS = new InjectionToken<INavItem>(
  '[NAV_ITEMS] Injection token'
);
