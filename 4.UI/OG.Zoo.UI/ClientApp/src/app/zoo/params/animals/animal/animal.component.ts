import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { AnimalService } from '../services/animal.service';
import { Animal } from '../models/animal';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit, OnDestroy {
  id: string;
  editMode: boolean;
  animalForm = this.fb.group({
    id: [null],
    name: [null, Validators.required],
    age: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
    country: [null, Validators.required],
    species: [null, Validators.required],
    subspecies: [null, Validators.required],
    eatingHabits: [null, Validators.required],
    type: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private animalService: AnimalService) { }

  ngOnInit() {
    this.route.params.pipe(untilComponentDestroyed(this)).subscribe((data) => {
      this.editMode = typeof (data.id) !== 'undefined';
      if (this.editMode) {
        this.get(data.id);
      }
    });
  }

  get(id: string) {
    this.animalService.get(id).pipe(untilComponentDestroyed(this)).subscribe((animal) => {
      this.id = id;
      this.animalForm.setValue(animal);
    });
  }

  onSubmit() {
    if (this.animalForm.valid) {
      const animal: Animal = this.animalForm.value;
      if (this.editMode) {
        animal.id = this.id;
        this.animalService.update(animal).pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.snackBar.open(`Animal "${animal.name}" has been updated.`, 'Dismiss', { duration: 3000 });
          this.goBack();
        });
      } else {
        this.animalService.create(animal).pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.snackBar.open(`Animal "${animal.name}" has been created.`, 'Dismiss', { duration: 3000});
          this.goBack();
        });
      }
    }
  }

  goBack() {
    this.router.navigate(['params/animals']);
  }

  ngOnDestroy(): void { }
}
