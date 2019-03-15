import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersModule } from './users/users.module';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  { path: 'users', loadChildren: './users/users.module#UsersModule' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersModule,
    RouterModule.forChild(routes)
  ]
})
export class SecurityModule { }
