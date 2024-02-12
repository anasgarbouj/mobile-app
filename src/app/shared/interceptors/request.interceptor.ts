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

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    info: string = "";
    timezoneOffset: number;
    timezone: string;

    constructor(
        private readonly geolocationService: GeolocationService
    ) {
        this.timezoneOffset = new Date().getTimezoneOffset();
        this.timezone = `${this.timezoneOffset > 0 ? '-' : '+'}${(Math.floor(Math.abs(this.timezoneOffset) / 60)).toString().padStart(2, '0')}:${(Math.abs(this.timezoneOffset) % 60).toString().padStart(2, '0')}`;
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // TODO: add loader?
        return from(this.geolocationService.checkAndRequestPermission()).pipe(
            mergeMap((position) => {
                if (position && (position.lat && position.long)) {
                    request = request.clone({
                        params: request.params
                            .set('lat', position.lat?.toString())
                            .set('long', position.long?.toString())
                            .set('timezone_offset', this.timezone)
                    });
                }
                return next.handle(request).pipe(
                    tap({
                        next: (event: any) => {
                            console.log("interceptor success");
                            return event;
                        },
                        error: (error) => {
                            this.info = error.error?.info ? error.error.info : "";
                            console.log("interceptor error: ", this.info);
                            // TODO: show error popups here
                        },
                    }),
                    finalize(() => {
                        console.log('interceptor finalize');
                    })
                );
            })
        );
    }
}
