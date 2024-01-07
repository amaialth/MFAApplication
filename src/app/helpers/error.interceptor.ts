import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthService) { }


  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error=>{
      if(error.status == 401 && !this.isLoginPage(request)){
        this.authenticationService.logout();
      }
      const errMsg = error.error.message || error.statusText;
      return throwError(()=> errMsg);
    }));
  }

  private isLoginPage(request: HttpRequest<any>){
    return request.url.includes("/login") || request.url.includes("/verifyTotp");
  }
}
