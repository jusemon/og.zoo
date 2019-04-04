import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Route, Router } from '@angular/router';
import { Base64 } from '../shared/utils/base64';
import { LoadingService } from '../shared/loading/loading.service';
import { finalize } from 'rxjs/operators';
import { InputDialogComponent, InputDialogData, InputDialogResponse } from '../shared/dialogs/input-dialog/input-dialog.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  authForm = this.fb.group({
    name: [null, Validators.required],
    password: [null, Validators.required]
  });

  recoveryPasswordData: InputDialogData = {
    content: 'Please enter your email',
    fields: [
      {
        label: 'Email',
        name: 'email',
        validators: {
          required: {
            message: 'Email is <strong>required</strong>',
            validator: Validators.required
          },
          email: {
            message: 'Must be a <strong>valid</strong> email',
            validator: Validators.email
          }
        },
        icon: 'mail_outline'
      }
    ]
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private loadingService: LoadingService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.loadingService.show();
      const user = this.authForm.value;
      user.password = Base64.encode(user.password);
      this.authService.authenticate(user).pipe(untilComponentDestroyed(this), finalize(() => this.loadingService.hide())).subscribe(() => {
        this.snackBar.open(`User "${user.name}" has logged on.`, 'Dismiss', { duration: 3000 });
        this.router.navigate(['home']);
      });
    }
  }

  openRecoveryPassword() {
    const dialogRef = this.dialog.open(InputDialogComponent, { width: '350px', data: this.recoveryPasswordData });
    dialogRef.beforeClosed().pipe(untilComponentDestroyed(this)).subscribe((result: InputDialogResponse) => {
      if (result) {
        this.loadingService.show();
        this.authService.sendRecovery(result.email).pipe(
          untilComponentDestroyed(this),
          finalize(() => this.loadingService.hide())
        ).subscribe(res => {
          this.snackBar.open(`Please check your mailbox`, 'Dismiss', { duration: 3000 });
        });
      }
    });
  }

  ngOnDestroy(): void { }

}
