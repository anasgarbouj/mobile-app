import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { IEmail } from 'src/app/shared/interfaces/email';
import { EmailService } from 'src/app/shared/services/email.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { errorImageSelect, successImageSelect } from 'src/app/shared/types/image-switch';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailConfirmationComponent implements OnInit {

  userEmail: string = ""
  private ticketId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private readonly emailService: EmailService,
    private popupService: PopupService,
    private translate: TranslateService
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ticketId = params.get('ticketId') ? Number(params.get('ticketId')) : null;
    });
  }


  sendEmail() {
    if (!this.ticketId) {
      const translatedErrorMessage = this.translate.instant("POPUP.ERROR_MESSAGES.INVALID_ENTRY")
      const errorImageSrc = errorImageSelect()
      this.popupService.openPopup(translatedErrorMessage, errorImageSrc);
      return;
    }

    if (!this.userEmail) {
      const translatedErrorMessage = this.translate.instant("POPUP.ERROR_MESSAGES.INVALID_EMAIL")
      const errorImageSrc = errorImageSelect()
      this.popupService.openPopup(translatedErrorMessage, errorImageSrc);
      return;
    }

    const emailObject: IEmail = {
      email: this.userEmail,
      ticket_id: this.ticketId,
    }
    console.log("Email Object--", emailObject);
    this.emailService.sendTicketViaEmail(emailObject).pipe(take(1))
      .subscribe({
        next: (response) => {
          console.log("Email Sent Response ==>:", response.info);
          const translatedErrorMessage = this.translate.instant("POPUP.SUCCESS_MESSAGES.TICKET_EMAIL_SENT")
          const errorImageSrc = successImageSelect("TICKET_EMAIL_SENT")
          this.popupService.openPopup(translatedErrorMessage, errorImageSrc);
        }
      })
  }
}
