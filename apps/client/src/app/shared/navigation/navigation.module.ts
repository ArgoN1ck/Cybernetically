import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationService } from './navigation.service';
import { INavItem, NAV_ITEMS } from './configs/navbar.provider';

@NgModule({
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
})
export class NavigationModule {
  static register(options: INavItem[]): ModuleWithProviders<NavigationModule> {
    return {
      ngModule: NavigationModule,
      providers: [
        ...options.map(
          (item): Provider => ({
            provide: NAV_ITEMS,
            useValue: item,
            multi: true,
          })
        ),
        NavigationService,
      ],
    };
  }
}
