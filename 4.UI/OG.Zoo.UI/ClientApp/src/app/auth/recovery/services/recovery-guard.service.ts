import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../login/services/auth.service';
import { UserLogin } from '../../login/models/user';

@Injectable()
export class RecoveryGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user: UserLogin = { token: route.queryParams.token || null, id: route.queryParams.id || null };
    return this.authService.checkRecoveryToken(user).toPromise().then(() => {
      return true;
    }, () => {
      return this.router.createUrlTree(['/auth']);
    });
  }
}
