import { EventEmitter, Injectable } from '@angular/core';
import { PopupValidDataTypes } from '../types/PopupValidDataTypes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProximityPopupComponent } from '../components/proximity-popup/proximity-popup.component';

@Injectable({
  providedIn: 'root'
})

export class PopupService {

  constructor(private modalService: NgbModal) { }

  openPopup(name: PopupValidDataTypes) {

    switch (name) {
      case PopupValidDataTypes.Proximity: this.open(ProximityPopupComponent)
    }

  }

  open(content: any) {
    this.modalService.open(content, {
      centered: true,
      modalDialogClass: 'custom-diag'
    })
  }
}
