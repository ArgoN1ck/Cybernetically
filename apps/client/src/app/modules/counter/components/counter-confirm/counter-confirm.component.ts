import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalRef, ModalService } from '../../../../shared/modal/modal.service';

@Component({
  selector: 'cybernetically-counter-confirm',
  templateUrl: './counter-confirm.component.html',
  styleUrls: ['counter-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterConfirmComponent {
  data!: { currentValue: number; incrementValue: number };
  modalRef!: ModalRef;

  constructor(private modalService: ModalService) {}

  cancel() {
    this.modalService.close(this.modalRef);
  }

  confirm() {
    this.modalService.close(this.modalRef, this.data.incrementValue);
  }
}
