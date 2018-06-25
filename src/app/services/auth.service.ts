import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials) {
    return this.http.post('/api/authenticate',
      JSON.stringify(credentials)).pipe(
        map(response => {
          let result = <any>response;
          if(result && result.token){
              localStorage.setItem('token', result.token);
              return true;
          }
          return false;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

}
