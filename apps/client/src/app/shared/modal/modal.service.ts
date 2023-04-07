import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  createComponent,
} from '@angular/core';
import { Subject } from 'rxjs';
import { IModalOptions } from './interfaces/modal-options.interface';
import { ModalComponent } from './components/modal/modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private componentRefMap: Map<ModalRef, ComponentRef<unknown>> = new Map();

  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  open(component: any, options?: IModalOptions) {
    const componentRef = createComponent<any>(ModalComponent, {
      environmentInjector: this.appRef.injector,
      elementInjector: this.injector,
    });
    componentRef;

    const modalRef = new ModalRef();
    componentRef.instance.childComponentType = component;
    Object.assign(componentRef.instance, {
      ...options,
      modalRef,
    } as IModalOptions);

    this.appRef.attachView(componentRef.hostView);
    this.document.body.appendChild((componentRef.hostView as any).rootNodes[0]);

    this.componentRefMap.set(modalRef, componentRef);

    return modalRef;
  }

  close(modalRef: ModalRef, data?: any) {
    const componentRef = this.componentRefMap.get(modalRef);

    if (componentRef) {
      this.appRef.detachView(componentRef.hostView);
      componentRef?.destroy();
      modalRef.close(data);
      this.componentRefMap.delete(modalRef);
    }
  }
}

export class ModalRef {
  private onClose = new Subject();
  onClose$ = this.onClose.asObservable();

  close(result?: any) {
    this.onClose.next(result);
    this.onClose.complete();
  }
}
