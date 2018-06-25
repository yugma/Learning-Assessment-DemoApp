import { Component, OnInit } from '@angular/core';
import { MatSpinner, MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  

  constructor(public authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  signIn(credentials) {
    console.log(credentials);
    this.authService.login(credentials).subscribe(result => {
      if (result) {        
        this.snackBar.open('Successfully loged-in!','',{
          duration: 3000
        });
        this.router.navigate(['/']);
      } else {
        this.snackBar.open('Invalid Username and/or Password!','',{
          duration: 3000
        });
      }
    }
    );
  }

  openSnackBar() {
    this.snackBar.openFromComponent(LoginComponent, {
      duration: 3000,
    });
  }

}
