import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { InfirmaryService } from '../services/infirmary.service';
import { Infirmary } from '../models/infirmary';

@Component({
  selector: 'app-infirmary',
  templateUrl: './infirmary.component.html',
  styleUrls: ['./infirmary.component.css']
})
export class InfirmaryComponent implements OnInit, OnDestroy {
  id: string;
  editMode: boolean;
  infirmaryForm = this.fb.group({
    id: [null],
    animal: [null],
    admissionDate: [null],
    idAnimal: [null, Validators.required],
    diagnosis: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private infirmaryService: InfirmaryService) { }

  ngOnInit() {
    this.route.params.pipe(untilComponentDestroyed(this)).subscribe((data) => {
      this.editMode = typeof (data.id) !== 'undefined';
      if (this.editMode) {
        this.get(data.id);
      }
    });
  }

  get(id: string) {
    this.infirmaryService.get(id).pipe(untilComponentDestroyed(this)).subscribe((infirmary) => {
      this.id = id;
      this.infirmaryForm.setValue(infirmary);
    });
  }

  onSubmit() {
    if (this.infirmaryForm.valid) {
      const infirmary: Infirmary = this.infirmaryForm.value;
      if (this.editMode) {
        infirmary.id = this.id;
        this.infirmaryService.update(infirmary).pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.snackBar.open(`Infirmary "${infirmary.admissionDate}" has been updated.`, 'Dismiss', { duration: 3000 });
          this.goBack();
        });
      } else {
        infirmary.admissionDate = new Date();
        this.infirmaryService.create(infirmary).pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.snackBar.open(`Infirmary "${infirmary.admissionDate}" has been created.`, 'Dismiss', { duration: 3000});
          this.goBack();
        });
      }
    }
  }

  goBack() {
    this.router.navigate(['params/infirmaries']);
  }

  ngOnDestroy(): void { }
}
