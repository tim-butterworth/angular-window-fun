import { Component } from '@angular/core';
import {
    HttpClient
    , HttpEvent
} from '@angular/common/http';
import { ResolverService } from './resolverService';
import {
    InterceptorService
    , Pending
} from './interceptorService';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'verifyapp';

    private resolverService: ResolverService
    private interceptorService: InterceptorService
    private httpClient: HttpClient
    data: Observable<any>

    constructor(
        resolverService: ResolverService
        , interceptorService: InterceptorService
        , httpClient: HttpClient
    ) {
        this.resolverService = resolverService
        this.interceptorService = interceptorService
        this.httpClient = httpClient
    }

    clickHandler() {
        this.data = this.resolverService.makeCall();
    }

    resolvePending(pending: Pending) {
        //        this.interceptorService.resolve(pending)
    }
}
