import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

    intercept(req: HttpRequest < any >, next: HttpHandler): Observable < HttpEvent < any >> {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.deauthenticate();
            this.router.navigate(['/auth']);
            this.snackBar.open('Auth denied.');
            return throwError('Auth denied');
          }
        }));
    }
  }
