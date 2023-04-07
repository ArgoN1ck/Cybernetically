import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ng-template[modalContent]',
})
export class ModalDirective {
  constructor(public vcr: ViewContainerRef) {}
}
