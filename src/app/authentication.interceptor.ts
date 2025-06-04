import { Injectable } from "@angular/core";
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { Observable,throwError } from "rxjs";
import { catchError,switchMap } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error) => {
                if (error.status === 401) {
                    return this.authService.refreshAccessToken().pipe(
                        switchMap((response: any) => {
                            localStorage.setItem('access_token', response.access);
                            req = req.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${response.access}`,
                                },
                            });
                            return next.handle(req);
                        }),
                        catchError((refreshError) => {
                            // Handle refresh token error (e.g., logout the user)
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('refresh_token');
                            return throwError(refreshError);
                        })
                    );
                }
                return throwError(error);
            })
        );
    }
}
