import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from "@angular/common/http";
import { Observable, from } from "rxjs";
import { finalize, mergeMap, tap } from "rxjs/operators";
import { GeolocationService } from "../services/geolocation.service";
import { PopupService } from "../services/popup.service";
import { TranslateService } from "@ngx-translate/core";
import { imageSelect } from "../types/image-switch";
import { manualErrorsUrls } from "../constants/manual-errors-urls";
import { LabsService } from "../services/labs.service";
import { Router } from "@angular/router";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    info: string = "";

    constructor(
        private readonly geolocationService: GeolocationService,
        private popupService: PopupService,
        private translate: TranslateService,
        private labService: LabsService,
        private router: Router
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Check geolocation and modify the request
        return from(this.geolocationService.checkAndRequestPermission()).pipe(
            mergeMap((position) => {
                if (position && (position.lat && position.long)) {
                    request = request.clone({
                        params: request.params
                            .set('lat', position.lat?.toString())
                            .set('long', position.long?.toString())
                    });
                }

                return this.labService.getKioskGroupId().pipe(
                    mergeMap((kioskGroupId) => {
                        if (kioskGroupId) {
                            // Modify the request to include the kioskGroupId if available
                            request = request.clone({
                                params: request.params
                                    .set('kioskGroupId', kioskGroupId)
                            });
                        }
                        // Handle the request
                        return next.handle(request).pipe(
                            tap({
                                next: (event: any) => {
                                    console.log("interceptor success");
                                    return event;
                                },
                                error: (error) => {
                                    console.log("interceptor error:", error.status);
                                    // if status is 403
                                    if (error.status === 403) {
                                        const translatedErrorMessage = this.translate.instant("POPUP.ERROR_MESSAGES.FORBIDDEN")
                                        const errorImageSrc = imageSelect()
                                        this.popupService.openPopup(translatedErrorMessage, errorImageSrc);
                                        this.router.navigateByUrl('/home');
                                    }
                                    // some urls errors have to be handled mannally
                                    else if (!manualErrorsUrls.some((subUrl: string) => request.url.includes(subUrl))) {
                                        this.info = error.error?.info ? error.error.info : "";

                                        const translatedErrorMessage = this.info ? this.translate.instant(`POPUP.ERROR_MESSAGES.${this.info}`) : this.translate.instant("POPUP.ERROR_MESSAGES.DEFAULT")
                                        const errorImageSrc = imageSelect(this.info)

                                        this.popupService.openPopup(translatedErrorMessage, errorImageSrc);
                                    }
                                }
                            }),
                            finalize(() => {
                                console.log('interceptor finalize');
                            })
                        );
                    })
                );
            })
        );
    }
}
