import { Injectable } from '@angular/core';
import { Infirmary } from '../models/infirmary';
import { BaseService } from 'src/app/shared/generics/base-service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { Response } from 'src/app/shared/generics/response';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InfirmaryService extends BaseService<Infirmary> {
  constructor(http: HttpClient, snackBar: MatSnackBar) {
    super(http, 'infirmary', snackBar);
  }

  /**
   * Get all the entities
   *
   * @param [urlController] The url controller
   * @returns A observable with a array of entities
   */
  public getAllWithRelations(): Observable<Infirmary[]> {
    return this.http.get<Response<Infirmary[]>>(`${this.api}/${this.urlController}/getAllWithRelations`).pipe(tap((response) => {
      if (!response.isSuccess) {
        this.snackBar.open(`An error has ocurred.`, 'Dismiss', { duration: 3000 });
        throw new Error(response.exceptionMessage);
      }
    }), map(response => response.result));
  }

  /**
   * Get the entity by id
   *
   * @param id The entity id
   * @param [urlController] The url controller
   * @returns A observable with the entity
   */
  public getWithRelations(id: string,): Observable<Infirmary> {   
     return this.http.get<Response<Infirmary>>(`${this.api}/${this.urlController}/getWithRelations/${id}`).pipe(tap((response) => {
      if (!response.isSuccess) {
        this.snackBar.open(`An error has ocurred.`, 'Dismiss', { duration: 3000 });
        throw new Error(response.exceptionMessage);
      }
    }), map(response => response.result));
  }
}
