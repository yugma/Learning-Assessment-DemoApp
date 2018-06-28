import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { availableTags } from '../../constants/available-tags';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-tags',
  templateUrl: './create-tags.component.html',
  styleUrls: ['./create-tags.component.css']
})
export class CreateTagsComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  stateCtrl: FormControl;
  filteredAvailableTags: Observable<any[]>;
  availableTags: any[] = availableTags;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      tagName: ['', Validators.required],
      tagDesc: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      parentTagName: ''
    });
  }
  filterStates(name: string) {
    return this.availableTags.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  constructor(private _formBuilder: FormBuilder, private http: HttpClient) {
    this.stateCtrl = new FormControl();
    this.filteredAvailableTags = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterStates(state) : this.availableTags.slice())
      );
  }

  saveTag() {
    let payload = {
      "title": this.firstFormGroup.value.tagName,
      "description": this.firstFormGroup.value.tagDesc,
      "parentId": null
    };
    this.http.post('https://apigateway.us-east-2.amazonaws.com/tag/create', payload).subscribe(result => {
      console.log("response of create tag API:", result);
    }
    );
  }
}
