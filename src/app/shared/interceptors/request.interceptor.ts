import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, forkJoin, from } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { GeolocationService } from '../services/geolocation.service';
import { PopupService } from '../services/popup.service';
import { TranslateService } from '@ngx-translate/core';
import { errorImageSelect } from '../types/image-switch';
import { manualErrorsUrls } from '../constants/manual-errors-urls';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  info: string = '';
  token: string | null = null;

  constructor(
    private readonly geolocationService: GeolocationService,
    private popupService: PopupService,
    private translate: TranslateService,
    private router: Router,
    public loadingController: LoadingController
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    // add Authorization token if exists for the ticket detail part
    this.token = localStorage.getItem('token');
    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: this.token,
        },
      });
    }

    // Skip intercepting translation requests and qr code related requests and pass them through
    if (
      request.url.includes('/assets/i18n/')
      // ||request.url.includes('/virtual_ticket/ticket/create/schedule-activity/')
    ) {
      return next.handle(request);
    }

    // Check geolocation and modify the request
    return forkJoin([
      from(this.geolocationService.getCurrentPosition()),
      from(this.loadingController.create()),
    ]).pipe(
      switchMap(([position, loader]) => {
        loader.present();
        if (position && position.lat && position.long) {
          const timezoneOffset = new Date().getTimezoneOffset();
          const timezone = `${timezoneOffset > 0 ? 'M' : 'P'}${Math.floor(
            Math.abs(timezoneOffset) / 60
          )
            .toString()
            .padStart(2, '0')}:${(Math.abs(timezoneOffset) % 60)
            .toString()
            .padStart(2, '0')}`;
          request = request.clone({
            params: request.params
              .set('timezone_offset', timezone)
              .set('lat', position.lat?.toString())
              .set('long', position.long?.toString()),
          });
        }

        return next.handle(request).pipe(
          tap({
            next: (event: any) => {
              console.log('interceptor success');
              return event;
            },
            error: (error) => {
              console.log('interceptor error:', error.status);
              // if status is 403
              if (error.status === 403) {
                if (
                  error.error?.info &&
                  (error.error?.info === 'FAR_KIOSK_GROUP' ||
                    error.error?.info === 'TICKET_EXPIRED')
                ) {
                  this.info = error.error?.info ? error.error.info : '';
                  const translatedErrorMessage = this.translate.instant(
                    `POPUP.ERROR_MESSAGES.${this.info}`
                  );
                  const errorImageSrc = errorImageSelect(this.info);
                  this.popupService.openPopup(
                    translatedErrorMessage,
                    errorImageSrc,
                    this.info == 'TICKET_EXPIRED' ? false : true
                  );
                } else {
                  localStorage.clear();
                  const translatedErrorMessage = this.translate.instant(
                    'POPUP.ERROR_MESSAGES.FORBIDDEN'
                  );
                  const errorImageSrc = errorImageSelect();
                  this.popupService.openPopup(
                    translatedErrorMessage,
                    errorImageSrc
                  );
                  this.router.navigateByUrl('/');
                }
              }
              // some urls errors have to be handled mannally
              else if (
                !manualErrorsUrls.some((subUrl: string) =>
                  request.url.includes(subUrl)
                )
              ) {
                this.info = error.error?.info ? error.error.info : '';

                const translatedErrorMessage = this.info
                  ? this.translate.instant(`POPUP.ERROR_MESSAGES.${this.info}`)
                  : this.translate.instant('POPUP.ERROR_MESSAGES.DEFAULT');
                const errorImageSrc = errorImageSelect(this.info);

                this.popupService.openPopup(
                  translatedErrorMessage,
                  errorImageSrc
                );
              }
            },
          }),
          finalize(() => {
            loader.dismiss();
          })
        );
      })
    );
  }
}
