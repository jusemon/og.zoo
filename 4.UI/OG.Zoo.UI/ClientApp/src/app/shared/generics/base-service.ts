import { BaseEntity } from './base-entity';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Response } from './response';
import { tap, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/auth/services/auth.service';

/**
 * A base for the services
 *
 * @export
 */
export class BaseService<TEntity extends BaseEntity> {
  api: string;

  constructor(
    protected http: HttpClient,
    protected urlController: string,
    protected snackBar: MatSnackBar,
    protected authService: AuthService
  ) {
    this.api = environment.apiZoo;
  }

  protected getOptions() {
    return {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    };
  }

  /**
   * Get all the entities
   *
   * @param [urlController] The url controller
   * @returns A observable with a array of entities
   */
  public getAll(urlController?: string): Observable<TEntity[]> {
    const controller = typeof (urlController) !== 'undefined' ? urlController : this.urlController;
    return this.http.get<Response<TEntity[]>>(`${this.api}/${controller}/`, this.getOptions()).pipe(tap((response) => {
      if (!response.isSuccess) {
        this.snackBar.open(response.exceptionMessage, 'Dismiss', { duration: 3000 });
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
  public get(id: string, urlController?: string): Observable<TEntity> {
    const controller = typeof (urlController) !== 'undefined' ? urlController : this.urlController;
    return this.http.get<Response<TEntity>>(`${this.api}/${controller}/${id}`, this.getOptions()).pipe(tap((response) => {
      if (!response.isSuccess) {
        this.snackBar.open(response.exceptionMessage, 'Dismiss', { duration: 3000 });
        throw new Error(response.exceptionMessage);
      }
    }), map(response => response.result));
  }

  /**
   * Create a entity
   *
   * @param entity The entity to create
   * @param [urlController] The url controller
   * @returns A observable with the entity
   */
  public create(entity: TEntity, urlController?: string): Observable<TEntity> {
    const controller = typeof (urlController) !== 'undefined' ? urlController : this.urlController;
    return this.http.post<Response<TEntity>>(`${this.api}/${controller}/`, entity, this.getOptions()).pipe(tap((response) => {
      if (!response.isSuccess) {
        this.snackBar.open(response.exceptionMessage, 'Dismiss', { duration: 3000 });
        throw new Error(response.exceptionMessage);
      }
    }), map(response => response.result));
  }

  /**
   * Update a entity
   *
   * @param entity The entity to update
   * @param [urlController] The url controller
   * @returns A observable with the entity
   */
  public update(entity: TEntity, urlController?: string): Observable<TEntity | any> {
    const controller = typeof (urlController) !== 'undefined' ? urlController : this.urlController;
    return this.http.put<Response<TEntity>>(`${this.api}/${controller}/`, entity, this.getOptions()).pipe(map(response => {
      if (!response.isSuccess) {
        this.snackBar.open(response.exceptionMessage, 'Dismiss', { duration: 3000 });
        throw new Error(response.exceptionMessage);
      }
      return response.result;
    }));
  }

  /**
   * Delete a entity
   *
   * @param id The entity id
   * @param [urlController] The url controller
   * @returns A observable with the entity
   */
  public delete(id: string, urlController?: string): Observable<TEntity> {
    const controller = typeof (urlController) !== 'undefined' ? urlController : this.urlController;
    return this.http.delete<Response<TEntity>>(`${this.api}/${controller}/${id}`, this.getOptions()).pipe(tap((response) => {
      if (!response.isSuccess) {
        this.snackBar.open(response.exceptionMessage, 'Dismiss', { duration: 3000 });
        throw new Error(response.exceptionMessage);
      }
    }), map(response => response.result));
  }
}
