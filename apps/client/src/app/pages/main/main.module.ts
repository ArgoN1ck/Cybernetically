import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './components/main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { CounterModule } from '../../modules/counter/counter.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, CounterModule],
})
export class MainModule {}
