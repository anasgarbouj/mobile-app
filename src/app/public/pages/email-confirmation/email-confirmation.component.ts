import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
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
  private ticketId : number|null = null;

  constructor(
    private popUpService: PopupService , 
    private _router: Router,
    private route: ActivatedRoute,
    private readonly emailService : EmailService
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ticketId = params.get('ticketId') ? Number(params.get('ticketId')) : null;
    });
  }


  sendEmail() {
    if (this.userEmail && this.ticketId) {      
      const emailObject: IEmail = {
        email: this.userEmail,
        ticket_id: this.ticketId
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
    }else {
      // TODO: add popup of error if email empty or no ticekt id error
      console.log("UNVALID VALUES: ", this.userEmail, this.ticketId);
    }
  }
}
