import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../modules/auth/auth.service';
import { NavigationService } from '../../../../shared/navigation/navigation.service';

@Component({
  selector: 'cybernetically-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isAuthenticated$ = this.authService.user$;

  constructor(
    private navigationService: NavigationService,
    private authService: AuthService
  ) {}

  get commonNavItems() {
    return this.navigationService.getCommonNavItems();
  }

  get authNavItems() {
    return this.navigationService.getAuthNavItems();
  }

  onClick() {
    this.authService.logout();
  }

  logout() {
    return this.authService.logout();
  }
}
