import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { BlogService } from './services/blog.service';
import { HttpClient } from '@angular/common/http';
import { Observable , of, EMPTY} from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class APIResolver implements Resolve<any> {
  constructor(private blogsevice: BlogService, private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log('resolver called');
    return this.http.get(environment.backendLink + 'api/blog/blogs' + route.params.id).pipe(catchError(error => {
      return EMPTY;
   }), mergeMap(something => {
         if (something) {
           return of(something);
         } else {
            return EMPTY;
         }
       })
     );
  }
}
