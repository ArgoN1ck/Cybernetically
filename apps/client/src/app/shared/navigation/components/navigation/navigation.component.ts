import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cybernetically-navigation',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {}
