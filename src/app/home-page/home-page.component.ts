import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {MatCard} from '@angular/material';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
