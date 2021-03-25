import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable()
export class ErrorHTTPInterceptor implements HttpInterceptor {

  constructor(public router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error is intercept')
        console.error(error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
      }
      return new Observable<HttpEvent<any>>();
      })
    )
  }
}
