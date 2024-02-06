import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, take } from 'rxjs';
import { IEmail } from 'src/app/shared/interfaces/email';
import { EmailService } from 'src/app/shared/services/email.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { PopupValidDataTypes } from 'src/app/shared/types/PopupValidDataTypes';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailConfirmationComponent implements OnInit {

  userEmail : string = ""
  private ticketID : number = 0;
  private readonly emailService = inject(EmailService)


  constructor(private popUpService: PopupService , private _router: Router) { }


  ngOnInit(): void {
    const id = this._router.getCurrentNavigation()?.extras.state?.['ticketId'];
    console.log("Ticket ID Recieved from service : ", id  );
    this.ticketID = id;

  }


  sendEmail() {
    const emailObject: IEmail = {
      email: this.userEmail,
      ticket_id: this.ticketID
    }

    this.emailService.sendTicketViaEmail(emailObject).pipe(take(1))
      .subscribe({
        next: (response) => {
          console.log("Email Sent Response ==>:", response.info);
          //map success info
          this.popUpService.openPopup(PopupValidDataTypes.Email_Sent)
        },
        error: (err) => {
          console.error('Error sending email:', err);
          console.error('Error Info:', err.error.info);
          this.popUpService.openPopup(PopupValidDataTypes.Email_Not_Sent)
        }
      })
  }


}
