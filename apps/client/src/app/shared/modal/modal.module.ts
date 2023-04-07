import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from './components/modal/modal.component';
import { ModalDirective } from './directives/modal.directive';

@NgModule({
  declarations: [ModalDirective, ModalComponent],
  imports: [CommonModule],
})
export class ModalModule {}
