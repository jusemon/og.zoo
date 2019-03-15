import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { InfirmariesListDataSource } from './infirmaries-list-datasource';

@Component({
  selector: 'app-infirmaries-list',
  templateUrl: './infirmaries-list.component.html',
  styleUrls: ['./infirmaries-list.component.css']
})
export class InfirmariesListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: InfirmariesListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new InfirmariesListDataSource(this.paginator, this.sort);
  }
}
