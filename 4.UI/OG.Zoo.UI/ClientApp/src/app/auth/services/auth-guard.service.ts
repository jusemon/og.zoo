import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const inAuth = route.routeConfig.path === 'auth';
    if (this.authService.isAuthenticated()) {
      if (inAuth) {
        this.router.navigate(['/home']);
      }
      return true;
    }
    if (!inAuth) {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}
