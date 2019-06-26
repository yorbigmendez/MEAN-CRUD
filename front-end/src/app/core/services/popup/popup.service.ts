import { PopupModalComponent } from '../../../shared/popup-modal/popup-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class PopupService {

  constructor(private modalService: NgbModal, private router: Router) { }

  showMessage(title: string, body: string, cancelButtonText?: string, submitButtonText?: string, routeToNavigate?: string) {
    const modalRef = this.modalService.open(PopupModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.bodyMessage = body;
    // modalRef.componentInstance.cancelButtonText = cancelButtonText;
    modalRef.componentInstance.submitButtonText = submitButtonText;
    modalRef.componentInstance.submitClickEvent.subscribe(($e) => {
      // Close the modal
      modalRef.close();
      this.router.navigate([routeToNavigate]);
    });
  }
}
