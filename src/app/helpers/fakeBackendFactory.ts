import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpInterceptingHandler } from '@angular/common/http/src/module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, materialize, dematerialize, delay } from 'rxjs/operators';

@Injectable()
export class fakeBackendFactory implements HttpInterceptor {

    constructor() {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(
            mergeMap(() => { // authenticate
                if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
                    const requestBody = JSON.parse(request.body);
                    if (requestBody.username === 'yugmashah' && requestBody.password === 'masheen@123') {
                        // if login details are valid return 200 OK with user details and fake jwt token
                        let user = requestBody;
                        let body = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
                        };

                        return of(new HttpResponse({ status: 200, body: body }));
                    } else {
                        // else return 400 bad request
                        throwError('Username or password is incorrect');
                        return of(new HttpResponse({ status: 200, body: null }));
                    }
                }

                // pass through any requests not handled above
                return next.handle(request);

            })
        );
    }
}
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: fakeBackendFactory,
    multi: true
};