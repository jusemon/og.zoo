import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CustomListDataSource } from 'src/app/shared/generics/custom-list-datasource';
import { MatPaginator, MatSort, MatTable, MatDialog, MatSnackBar } from '@angular/material';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ConfirmComponent } from 'src/app/shared/dialogs/confirm/confirm.component';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  dataSource: CustomListDataSource<User>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'actions'];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService) {
  }

  ngOnInit() {
    this.dataSource = new CustomListDataSource(this.paginator, this.sort);
    this.refresh();
  }

  refresh() {
    this.userService.getAll().pipe(untilComponentDestroyed(this)).subscribe((data) => {
      this.dataSource.setData(data);
    });
  }

  delete(user: User) {
    const dialogRef = this.dialog.open(ConfirmComponent, { width: '250px', data: { content: 'Are you sure you want to delete it?' } });
    dialogRef.afterClosed().pipe(untilComponentDestroyed(this)).subscribe(result => {
      if (result) {
        this.userService.delete(user.id).pipe(untilComponentDestroyed(this)).subscribe(() => {
          const data = this.dataSource.data;
          data.splice(data.findIndex((d) => d.id === user.id), 1);
          this.dataSource.setData(data);
          this.snackBar.open(`User "${user.name}" has been deleted.`, 'Dismiss', { duration: 3000 });
        });
      }
    });
  }

  ngOnDestroy(): void { }
}
