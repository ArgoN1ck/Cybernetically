import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthData } from './dtos/auth.dto';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { IAuthResponse } from './interfaces/auth-response.interface';
import { IUser } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<IUser | null>(null);
  public user$ = this.getCurrentUser();

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  signUp(data: AuthData): Observable<IAuthResponse> {
    const url = `${environment.api}/auth/sign-up`;

    return this.http.post<IAuthResponse>(url, data).pipe(
      tap(({ accessToken: token, user }) => this.authAction(token, user)),
      catchError((err) => this.handleError(err))
    );
  }

  signIn(data: AuthData): Observable<IAuthResponse> {
    const url = `${environment.api}/auth/sign-in`;

    return this.http.post<IAuthResponse>(url, data).pipe(
      tap(({ accessToken: token, user }) => this.authAction(token, user)),
      catchError((err) => this.handleError(err))
    );
  }

  logout() {
    this.removeToken();
    this.user.next(null);
    this.router.navigate(['/', 'sign-in']);
  }

  getToken() {
    return this.localStorageService.get('cybernetically-auth-token');
  }

  private getCurrentUser() {
    const user = this.localStorageService.get('cybernetically-auth-user');

    if (!user) {
      this.user.next(null);
    } else {
      this.user.next(JSON.parse(user));
    }

    return this.user.asObservable();
  }

  private authAction(token: string, user: IUser) {
    this.localStorageService.set('cybernetically-auth-token', token);
    this.localStorageService.set(
      'cybernetically-auth-user',
      JSON.stringify(user)
    );
    this.user.next(user);
    this.router.navigate(['/']);
  }

  private removeToken() {
    this.localStorageService.clear();
  }

  private handleError({ error }: HttpErrorResponse) {
    return throwError(() => error.description);
  }
}
