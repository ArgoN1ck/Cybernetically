import { inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

export const AuthGuard = () => {
  const router = inject(Router);

  return inject(AuthService).user$.pipe(
    tap((value) => (value ? true : router.navigate(['/sign-up'])))
  );
};

export const NoAuthGuard = () => {
  const router = inject(Router);

  return inject(AuthService).user$.pipe(
    tap((value) => (!value ? true : router.navigate(['/'])))
  );
};
