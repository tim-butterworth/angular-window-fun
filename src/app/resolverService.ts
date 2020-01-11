import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
class ResolverService {
    private httpClient: HttpClient

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    makeCall(): Observable<any> {
        let observer = this.httpClient.get("http://www.example.com")
        return observer
    }
}

export { ResolverService }
