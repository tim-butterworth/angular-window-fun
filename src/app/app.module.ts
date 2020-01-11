import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
    HttpClientModule
    , HTTP_INTERCEPTORS
} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ResolverService } from './resolverService';
import { InterceptorService } from './interceptorService';
import { Interceptor } from './interceptor';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule
        , HttpClientModule
    ],
    providers: [
        ResolverService
        , InterceptorService
        , {
            provide: HTTP_INTERCEPTORS,
            useClass: Interceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
