import { Component, OnInit } from '@angular/core';
import { availableTags } from '../../constants/available-tags';

@Component({
  selector: 'app-view-tags',
  templateUrl: './view-tags.component.html',
  styleUrls: ['./view-tags.component.css']
})
export class ViewTagsComponent implements OnInit {
  availableTags: any[];

  constructor() { 
  }

  ngOnInit() {
    this.availableTags = availableTags;
  }
}
