import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from 'rxjs/operators';
import { Router } from "@angular/router";
import { AuthenticationService } from "./services/authentication.service";

@Injectable()
export class ErrorHTTPInterceptor implements HttpInterceptor {

  constructor(public router: Router, public authService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error is intercept');
        console.error(error.error.message);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        if (error.error.message === "Wrong Email") {
          this.authService.wrongCred = true;
        }
        if (error.error.message === "Email Already Exist") {
          this.authService.emailExist = true;
        }
      return new Observable<HttpEvent<any>>();
      })
    )
  }
}
