import { Injectable } from '@angular/core';
import { Infirmary } from '../models/infirmary';
import { BaseService } from 'src/app/shared/generics/base-service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class InfirmaryService extends BaseService<Infirmary> {
  constructor(http: HttpClient, snackBar: MatSnackBar) {
    super(http, 'infirmary', snackBar);
  }
}
