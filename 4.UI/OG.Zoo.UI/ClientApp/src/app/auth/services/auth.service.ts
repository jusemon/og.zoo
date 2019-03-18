import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { UserLogin } from '../models/user';
import { User } from '../../zoo/security/users/models/user';
import { Response } from '../../shared/generics/response';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    api: string;
    key: string;

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {
        this.api = environment.apiZoo;
        this.key = environment.key;
    }

    /**
     * Get if user authenticated
     *
     * @returns true if user is authenticated
     */
    public isAuthenticated(): boolean {
        return localStorage.getItem(this.key) !== null;
    }

    /**
     * Create a entity
     *
     * @param entity The entity to create
     * @param [urlController] The url controller
     * @returns A observable with the entity
     */
    public authenticate(entity: UserLogin): Observable<User> {
        return this.http.post<Response<User>>(`${this.api}/user/login`, entity).pipe(tap((response) => {
            if (!response.isSuccess) {
                this.snackBar.open(response.exceptionMessage, 'Dismiss', { duration: 3000 });
                throw new Error(response.exceptionMessage);
            }
        }), map(response => response.result));
    }
}
