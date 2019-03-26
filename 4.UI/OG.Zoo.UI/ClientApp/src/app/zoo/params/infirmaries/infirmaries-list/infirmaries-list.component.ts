import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Infirmary } from '../models/infirmary';
import { CustomListDataSource } from 'src/app/shared/generics/custom-list-datasource';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { InfirmaryService } from '../services/infirmary.service';
import { ConfirmComponent } from 'src/app/shared/dialogs/confirm/confirm.component';

@Component({
  selector: 'app-infirmaries-list',
  templateUrl: './infirmaries-list.component.html',
  styleUrls: ['./infirmaries-list.component.scss']
})
export class InfirmariesListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CustomListDataSource<Infirmary>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['animal', 'admissionDate', 'diagnosis', 'actions'];

  /**
   *
   */
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private infirmaryService: InfirmaryService
  ) { }

  ngOnInit() {
    this.dataSource = new CustomListDataSource(this.paginator, this.sort);
    this.refresh();
  }

  refresh() {
    this.infirmaryService.getAllWithRelations().pipe(untilComponentDestroyed(this)).subscribe((data) => {
      this.dataSource.setData(data);
    });
  }

  delete(infirmary: Infirmary) {
    const dialogRef = this.dialog.open(ConfirmComponent, { width: '250px', data: { content: 'Are you sure you want to delete it?' } });
    dialogRef.afterClosed().pipe(untilComponentDestroyed(this)).subscribe(result => {
      if (result) {
        this.infirmaryService.delete(infirmary.id).pipe(untilComponentDestroyed(this)).subscribe(() => {
          const data = this.dataSource.data;
          data.splice(data.findIndex((d) => d.id === infirmary.id), 1);
          this.dataSource.setData(data);
          this.snackBar.open(`Infirmary "${infirmary.admissionDate}" has been deleted.`, 'Dismiss', { duration: 3000 });
        });
      }
    });
  }

  ngOnDestroy(): void { }
}
