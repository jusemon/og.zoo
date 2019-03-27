import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Animal } from '../models/animal';
import { CustomListDataSource } from 'src/app/shared/generics/custom-list-datasource';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { AnimalService } from '../services/animal.service';
import { ConfirmComponent } from 'src/app/shared/dialogs/confirm/confirm.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.scss']
})
export class AnimalsListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CustomListDataSource<Animal>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'age', 'country', 'species', 'subspecies', 'eatingHabits', 'type', 'actions'];

  /**
   *
   */
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private animalService: AnimalService
  ) { }

  ngOnInit() {
    this.dataSource = new CustomListDataSource(this.paginator, this.sort);
    this.refresh();
  }

  refresh() {
    this.animalService.getAll().pipe(untilComponentDestroyed(this)).subscribe((data) => {
      this.dataSource.setData(data);
    });
  }

  delete(animal: Animal) {
    const dialogRef = this.dialog.open(ConfirmComponent, { width: '250px', data: { content: 'Are you sure you want to delete it?' } });
    dialogRef.afterClosed().pipe(untilComponentDestroyed(this)).subscribe(result => {
      if (result) {
        this.animalService.delete(animal.id).pipe(untilComponentDestroyed(this)).subscribe(() => {
          const data = this.dataSource.data;
          data.splice(data.findIndex((d) => d.id === animal.id), 1);
          this.dataSource.setData(data);
          this.snackBar.open(`Animal "${animal.name}" has been deleted.`, 'Dismiss', { duration: 3000 });
        });
      }
    });
  }

  export() {
    const data = this.dataSource.data.map(u => {
      return {
        Name: u.name,
        Age: u.age,
        Country: u.country,
        Species: u.species,
        Subspecies: u.subspecies,
        'Eating habits': u.eatingHabits,
        Type: u.type
      };
    });
    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Animals');
    XLSX.writeFile(workBook, 'animals.xlsx', { bookType: 'xlsx', type: 'buffer' });
  }

  ngOnDestroy(): void { }
}
