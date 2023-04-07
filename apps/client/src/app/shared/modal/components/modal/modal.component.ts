import {
  Component,
  ComponentRef,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalRef, ModalService } from '../../modal.service';
import { ModalDirective } from '../../directives/modal.directive';

@Component({
  selector: 'cybernetically-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  data: any = null;
  modalRef!: ModalRef;

  childComponentType!: Type<any>;
  componentRef!: ComponentRef<any>;
  @ViewChild(ModalDirective, { static: true, read: ViewContainerRef })
  vcr!: ViewContainerRef;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.loadChildComponent();
  }

  loadChildComponent() {
    this.vcr.clear();
    this.componentRef = this.vcr.createComponent(this.childComponentType);
    Object.assign(this.componentRef.instance, {
      data: this.data,
      modalRef: this.modalRef,
    });
  }

  closeModal() {
    this.componentRef.destroy();
    this.modalService.close(this.modalRef);
  }
}
