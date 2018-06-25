import { Component, OnInit } from '@angular/core';
import { VIDEOS } from '../../constants/videos';
import { MatList } from '@angular/material';


@Component({
  selector: 'app-view-modules',
  templateUrl: './view-modules.component.html',
  styleUrls: ['./view-modules.component.css']
})
export class ViewModulesComponent implements OnInit {
  videos: any[];
  selectedVideo: any = VIDEOS[0];

  constructor() {
    this.videos = VIDEOS;
  }

  ngOnInit() {
  }

  selectVideo(video) {
    this.selectedVideo = video;
  }

}
