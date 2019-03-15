import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomListDataSource } from 'src/app/shared/generics/custom-list-datasource';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  dataSource: CustomListDataSource<User>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'actions'];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.dataSource = new CustomListDataSource(this.paginator, this.sort);
    this.refresh();
  }

  refresh() {
    this.userService.getAll().subscribe((data) => {
      this.dataSource.setData(data);
    });
  }

  delete(id: string) {
    this.userService.delete(id).subscribe(()=>{
      const data = this.dataSource.data;
      data.splice(data.findIndex((d) => d.id === id), 1);
      this.dataSource.setData(data);
    });
  }
}
