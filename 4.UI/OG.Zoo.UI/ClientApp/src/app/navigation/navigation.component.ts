import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutesService } from '../shared/services/routes.service';
import { Route } from '../shared/services/routes';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  routes: Route[];
  navigationVisible: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      untilComponentDestroyed(this)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private routesService: RoutesService,
    public authService: AuthService) { }

  ngOnInit() {
    this.routesService.get().pipe(untilComponentDestroyed(this)).subscribe((routes) => {
      this.routes = routes;
    });
    this.authService.isAuthenticated.pipe(untilComponentDestroyed(this)).subscribe((value) => {
      if (value) {
        setTimeout(() => this.navigationVisible = value, 100);
      } else {
        this.navigationVisible = value;
      }
    });
  }

  close() {
    this.authService.deauthenticate();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy(): void { }
}
