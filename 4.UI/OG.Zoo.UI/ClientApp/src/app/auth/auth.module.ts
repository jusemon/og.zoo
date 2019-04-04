import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InputDialogComponent } from '../shared/dialogs/input-dialog/input-dialog.component';

const routes: Route[] = [
    { path: '', component: AuthComponent }
];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ],
  entryComponents: [InputDialogComponent]
})
export class AuthModule { }
