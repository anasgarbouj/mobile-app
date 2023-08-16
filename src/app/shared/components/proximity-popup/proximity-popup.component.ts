import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AlertController, IonicSafeString } from '@ionic/angular';

@Component({
  selector: 'app-proximity-popup',
  templateUrl: './proximity-popup.component.html',
  styleUrls: ['./proximity-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProximityPopupComponent {
  @Input() isOpen = false
  public alertButtons = [{
    text: 'Fermer',
    role: 'cancel',
    cssClass: 'custom-btn'
  }];
  htmlContent = `
      <div style="height:100%;text-align:center;">
      <ion-img style="width: 132px; height: auto;margin:auto;" 
         src="assets/images/geolocation.svg"></ion-img>
      <p style="color: #212121;
                text-align: justify;
                font-family: Helvetica;
                font-size: 14px;
                font-weight: 400;
                margin-top:24px;
                "
                >
        Désolé, le laboratoire scanné n'est pas dans votre zone approximative.
        Veuillez vous rapprocher de votre laboratoire et réessayer.</p>
    </div>
  `;
  constructor(private alertController: AlertController) {

  }

  setOpen(isOpen: boolean) {
    // this.isOpen = isOpen;
    this.presentAlertWithImage()
  }

  async presentAlertWithImage() {

    const alert = await this.alertController.create({
      message: new IonicSafeString(this.htmlContent),
      cssClass: "custom-diag",
      buttons: this.alertButtons,
    });

    await alert.present();
  }

}
