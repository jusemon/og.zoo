import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { AuthService } from '../login/services/auth.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { UserLogin } from '../login/models/user';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.sass']
})
export class RecoveryComponent implements OnInit, OnDestroy {
  user: UserLogin;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.route.queryParams.pipe(untilComponentDestroyed(this)).subscribe((data) => {
      const user: UserLogin = { token: data.token || null, id: data.id || null };
      this.authService.checkRecoveryToken(user).subscribe((res) => {
        this.user = res;
      }, () => {
        this.router.navigate(['/auth']);
      });
    });
  }

  ngOnDestroy(): void { }
}
