import { Injectable } from '@angular/core';
import { Routes, Route } from './routes';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoutesService {

    routes = Routes;
    constructor() {
    }

    get(): Observable<Route[]> {
        return Observable.create((observer) => observer.next(this.routes));
    }
}
