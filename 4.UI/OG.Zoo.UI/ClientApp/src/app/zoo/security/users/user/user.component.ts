import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { RouterEvent, Router, Route, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  routeSub: Subscription;
  user: User;
  editMode: boolean;
  userForm = this.fb.group({
    name: [null, Validators.compose([
      Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(8), Validators.maxLength(50)])]
  });

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((data) => {
      this.editMode = typeof (data.id) !== 'undefined';
      console.log(data);
      if (this.editMode) {
        this.get(data.id);
      }
    });
  }

  get(id: string) {
    this.userService.get(id).subscribe((user) => {
      this.user = user;
      this.userForm.setValue({ name: user.name, password: user.password });
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  onSubmit() {
    if (this.userForm.valid) {
      const id = this.user.id;
      this.user = this.userForm.value;
      if (this.editMode) {
        this.user.id = id;
        this.userService.update(this.user).subscribe(() => this.goBack());
      } else {
        this.userService.create(this.user).subscribe(() => this.goBack());
      }
    }
  }

  goBack() {
    this.router.navigate(['security/users']);
  }
}
