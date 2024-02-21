import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from "@angular/common/http";
import { Observable, forkJoin, from } from "rxjs";
import { finalize, switchMap, tap } from "rxjs/operators";
import { GeolocationService } from "../services/geolocation.service";
import { PopupService } from "../services/popup.service";
import { TranslateService } from "@ngx-translate/core";
import { errorImageSelect } from "../types/image-switch";
import { manualErrorsUrls } from "../constants/manual-errors-urls";
import { LabsService } from "../services/labs.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    info: string = "";
    token: string | null;

    constructor(
        private readonly geolocationService: GeolocationService,
        private popupService: PopupService,
        private translate: TranslateService,
        private labService: LabsService,
        private router: Router,
        public loadingController: LoadingController
    ) {
        this.token = localStorage.getItem("token")
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // add Authorization token if exists
        if (this.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: this.token,
                },
            });
        }

        // Check geolocation and modify the request
        return forkJoin([from(this.geolocationService.getCurrentPosition()), from(this.loadingController.create())]).pipe(
            switchMap(([position, loader]) => {
                loader.present()
                if (position && (position.lat && position.long)) {
                    request = request.clone({
                        params: request.params
                            .set('lat', position.lat?.toString())
                            .set('long', position.long?.toString())
                    });
                }

                return this.labService.getKioskGroupId().pipe(
                    switchMap((kioskGroupId) => {
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
                                        const errorImageSrc = errorImageSelect()
                                        this.popupService.openPopup(translatedErrorMessage, errorImageSrc);
                                        this.router.navigateByUrl('/home');
                                    }
                                    // some urls errors have to be handled mannally
                                    else if (!manualErrorsUrls.some((subUrl: string) => request.url.includes(subUrl))) {
                                        this.info = error.error?.info ? error.error.info : "";

                                        const translatedErrorMessage = this.info ? this.translate.instant(`POPUP.ERROR_MESSAGES.${this.info}`) : this.translate.instant("POPUP.ERROR_MESSAGES.DEFAULT")
                                        const errorImageSrc = errorImageSelect(this.info)

                                        this.popupService.openPopup(translatedErrorMessage, errorImageSrc);
                                    }
                                }
                            }),
                            finalize(() => {
                                loader.dismiss()
                            })
                        );
                    })
                );
            })
        );
    }


}
