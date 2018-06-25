import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material';
@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onFileComplete(param) {
    console.log("FileUploaded successfully"+ param);
  }

}
