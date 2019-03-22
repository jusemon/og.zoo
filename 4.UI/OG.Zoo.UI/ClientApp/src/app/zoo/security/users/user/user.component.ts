import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Base64 } from 'src/app/shared/utils/base64';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  editMode: boolean;
  pass = '**********';
  userForm = this.fb.group({
    id: [null],
    name: [null, Validators.compose([
      Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(8), Validators.maxLength(50)])]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private userService: UserService) { }

  ngOnInit() {
    this.route.params.pipe(untilComponentDestroyed(this)).subscribe((data) => {
      this.editMode = typeof (data.id) !== 'undefined';
      if (this.editMode) {
        this.get(data.id);
      }
    });
  }

  get(id: string) {
    this.userService.get(id).pipe(untilComponentDestroyed(this)).subscribe((user) => {
      user.password = this.pass;
      this.userForm.setValue(user);
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      user.password = Base64.encode(user.password);
      if (this.editMode) {
        if (user.password === Base64.encode(this.pass)) {
          user.password = '';
        }
        this.userService.update(user).pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.snackBar.open(`User "${user.name}" has been updated.`, 'Dismiss', { duration: 3000 });
          this.goBack();
        });
      } else {
        this.userService.create(user).pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.snackBar.open(`User "${user.name}" has been created.`, 'Dismiss', { duration: 3000});
          this.goBack();
        });
      }
    }
  }

  goBack() {
    this.router.navigate(['security/users']);
  }

  ngOnDestroy(): void { }
}
