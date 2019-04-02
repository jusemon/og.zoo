import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,
  MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule,
  MatSelectModule, MatRadioModule, MatCardModule, MatSnackBarModule,
  MatDialogModule, MatFormFieldModule, MatAutocompleteModule,
  MatProgressBarModule, MatProgressSpinnerModule
} from '@angular/material';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [ConfirmComponent, LoadingComponent],
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
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ConfirmComponent
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }
