import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
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
    private isAuthenticatedSource = new BehaviorSubject(localStorage.getItem(environment.key) != null);
    isAuthenticated = this.isAuthenticatedSource.asObservable();
    api: string;
    key: string;

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {
        this.api = environment.apiZoo;
        this.key = environment.key;
    }

    /**
     * Set if user authenticated
     *
     */
    private setIsAuthenticated(status: boolean) {
        this.isAuthenticatedSource.next(status);
    }

    /**
     * Get if user authenticated
     *
     * @returns true if user is authenticated
     */
    public getIsAuthenticated(): boolean {
        return localStorage.getItem(environment.key) != null;
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
            } else {
                this.setIsAuthenticated(true);
                return localStorage.setItem(this.key, JSON.stringify(response.result));
            }
        }), map(response => response.result));
    }

    /**
     * Deauthenticate the user
     *
     */
    public deauthenticate(): void {
        this.setIsAuthenticated(false);
        localStorage.clear();
    }
}
