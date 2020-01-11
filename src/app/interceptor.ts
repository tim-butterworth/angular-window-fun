import {
    HttpInterceptor
    , HttpRequest
    , HttpHandler
    , HttpEvent
    , HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
    Observable
    , Observer
    , Subject
} from 'rxjs';

import { InterceptorService } from './interceptorService';

@Injectable()
export class Interceptor implements HttpInterceptor {

    private interceptorService: InterceptorService

    constructor(interceptorService: InterceptorService) {
        this.interceptorService = interceptorService
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let subject: Subject<HttpEvent<any>> = new Subject()
        const observable = new Observable((observer: Observer<HttpEvent<any>>) => {
            debugger;
            const name = `${Math.random()}`

            this.interceptorService.addNewPending({ name }, observer)
            console.log(name)
        })

        return observable;
    }
}
