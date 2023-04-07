import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './components/counter/counter.component';
import { CounterConfirmComponent } from './components/counter-confirm/counter-confirm.component';

@NgModule({
  declarations: [CounterComponent],
  bootstrap: [CounterConfirmComponent],
  imports: [CommonModule],
  exports: [CounterComponent],
})
export class CounterModule {}
