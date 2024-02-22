import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { PEmail } from 'src/app/shared/interfaces/email';
import { PopupService } from 'src/app/shared/services/popup.service';
import { errorImageSelect, successImageSelect } from 'src/app/shared/types/image-switch';
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailConfirmationComponent implements OnInit {

  userEmail: string = ""

  constructor(
    private route: ActivatedRoute,
    private readonly authService: AuthService,
    private popupService: PopupService,
    private translate: TranslateService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      if ("token" in queryParams && queryParams['token']) {
        localStorage.setItem('token', queryParams['token'])
        this.router.navigate(['home'])
      } else if (localStorage.hasOwnProperty("token")) {
        this.router.navigate(['home'])
      }
    });
  }


  sendEmail() {
    if (!this.userEmail) {
      const translatedErrorMessage = this.translate.instant("POPUP.ERROR_MESSAGES.INVALID_EMAIL")
      const errorImageSrc = errorImageSelect()
      this.popupService.openPopup(translatedErrorMessage, errorImageSrc);
      return;
    }

    const emailObject: PEmail = {
      email: this.userEmail,
    }
    console.log("Email Object--", emailObject);
    this.authService.sendPatientLoginEmail(emailObject).pipe(take(1))
      .subscribe({
        next: (response) => {
          const translatedMessage = this.translate.instant(`POPUP.SUCCESS_MESSAGES.${response.info}`)
          const imageSrc = successImageSelect(response.info)
          this.popupService.openPopup(translatedMessage, imageSrc);
        }
      })
  }
}
