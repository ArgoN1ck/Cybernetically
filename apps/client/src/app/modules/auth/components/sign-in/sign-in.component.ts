import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  BehaviorSubject,
  Subject,
  catchError,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';

import { AuthService } from '../../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cybernetically-sign-in',
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit, OnDestroy {
  private backendErrors = new Subject();
  private isLoading = new BehaviorSubject(false);
  private destroyed$ = new Subject();

  form!: FormGroup;
  backendErrors$ = this.backendErrors.asObservable();
  isLoading$ = this.isLoading.asObservable();

  constructor(private fb: FormBuilder, private authService: AuthService) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onSubmit() {
    this.authService
      .signIn(this.form.value)
      .pipe(
        tap(() => this.isLoading.next(true)),
        takeUntil(this.destroyed$),
        catchError((err) => this.handleError(err))
      )
      .subscribe();
  }

  private initializeForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  private handleError(err: HttpErrorResponse) {
    this.backendErrors.next(err);
    this.isLoading.next(false);
    return throwError(() => err);
  }
}
