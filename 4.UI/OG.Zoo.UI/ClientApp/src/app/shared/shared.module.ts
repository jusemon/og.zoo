import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,
  MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule,
  MatSelectModule, MatRadioModule, MatCardModule, MatSnackBarModule,
  MatDialogModule, MatFormFieldModule, MatAutocompleteModule
} from '@angular/material';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';


@NgModule({
  declarations: [ConfirmComponent],
  exports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatAutocompleteModule,
    ConfirmComponent
  ],
  imports: [
    MatDialogModule,
    MatButtonModule
  ]
})
export class SharedModule { }
