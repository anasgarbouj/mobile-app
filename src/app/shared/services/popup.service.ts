import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessagePopupComponent } from '../components/popups/message-popup/message-popup.component';
import { ExpiredPopupComponent } from '../components/popups/expired-popup/expired-popup.component';

@Injectable({
  providedIn: 'root'
})

export class PopupService {
  private modalQueue: (() => void)[] = [];
  private isModalOpen = false;

  constructor(
    private modalService: NgbModal
  ) { }

  async openPopup(message: string, imageSrc: string = "", isDefault: boolean= true) {
    return new Promise((resolve, reject) => {

      if (this.isModalOpen) {
        // If a modal is already open, queue up the request
        this.modalQueue.push(() => this.openPopup(message, imageSrc));
      } else {
        // Open modal
        const modalRef = this.modalService.open(isDefault ? MessagePopupComponent : ExpiredPopupComponent, {
          centered: true,
          modalDialogClass: 'custom-diag'
        })
        this.isModalOpen = true;
        modalRef.componentInstance.message = message;
        modalRef.componentInstance.imageSrc = imageSrc;

        modalRef.result.finally(() => {
          this.isModalOpen = false;
          // Check if there are queued modal requests
          const nextModalRequest = this.modalQueue.shift();
          if (nextModalRequest) {            
            nextModalRequest();
          }
        }).then(resolve).catch(reject);
      }
    })
  }
}
