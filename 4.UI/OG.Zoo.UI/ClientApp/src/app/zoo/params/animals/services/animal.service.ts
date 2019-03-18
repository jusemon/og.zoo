import { Injectable } from '@angular/core';
import { Animal } from '../models/animal';
import { BaseService } from 'src/app/shared/generics/base-service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AnimalService extends BaseService<Animal> {
  constructor(http: HttpClient, snackBar: MatSnackBar) {
    super(http, 'animal', snackBar);
  }
}
