import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ICounter } from '../../shared/models/counter.model';
import { environment } from '../../../environments/environment';
import { IIncrementResponse } from './interfaces/increment-response.interface';

@Injectable({ providedIn: 'root' })
export class CounterService {
  constructor(private http: HttpClient) {}

  getCounter() {
    const url = `${environment.api}/counter`;

    return this.http.get<ICounter>(url);
  }

  getIncrementedCount(count: number) {
    const url = `${environment.api}/counters/increment`;

    return this.http.post<IIncrementResponse>(url, {
      count,
    });
  }

  saveCount(id: string, count: number) {
    const url = `${environment.api}/counters/${id}`;

    return this.http.put<ICounter>(url, {
      count,
    });
  }
}
