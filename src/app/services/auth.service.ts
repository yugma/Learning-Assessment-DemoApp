import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private helper: JwtHelperService) { }

  login(credentials) {
    return this.http.post('/api/authenticate',
      JSON.stringify(credentials)).pipe(
        map(response => {
          let result = <any>response;
          if (result && result.token) {
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
    let token = localStorage.getItem('token');    
    return !(this.helper.isTokenExpired(token));
  }

}
