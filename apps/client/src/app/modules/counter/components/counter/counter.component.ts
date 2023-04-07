/* eslint-disable */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CounterService } from '../../counter.service';
import { BehaviorSubject, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ICounter } from '../../../../shared/models/counter.model';
import { ModalRef, ModalService } from '../../../../shared/modal/modal.service';
import { CounterConfirmComponent } from '../counter-confirm/counter-confirm.component';

@Component({
  selector: 'cybernetically-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit, OnDestroy {
  private counter = new BehaviorSubject<ICounter>(null!);
  private isLoading = new BehaviorSubject(false);
  private destroyed$ = new Subject();

  counter$ = this.counter.asObservable();
  isLoading$ = this.isLoading.asObservable();

  modalRef!: ModalRef;

  constructor(
    private counterService: CounterService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.initializeValues();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getCounter() {
    this.counterService
      .getCounter()
      .pipe(
        tap((data) => {
          this.isLoading.next(true);
          this.counter.next(data);
        }),
        tap(() => this.isLoading.next(false)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  getIncrementalCount() {
    const count = this.counter.value.count;

    this.counterService
      .getIncrementedCount(count)
      .pipe(
        tap((data) => {
          this.modalRef = this.modalService.open(CounterConfirmComponent, {
            data,
          });
        }),
        switchMap(() =>
          this.modalRef.onClose$.pipe(
            tap((data: any) => {
              if (!!data) {
                const counter = this.counter.value;
                counter.count = data;
                this.counter.next(counter);
              }
            })
          )
        ),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  saveCount() {
    const { id, count } = this.counter.value;

    this.counterService
      .saveCount(id, count)
      .pipe(tap(), takeUntil(this.destroyed$))
      .subscribe();
  }

  private initializeValues() {
    this.getCounter();
  }
}
