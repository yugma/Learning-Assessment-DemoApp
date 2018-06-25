import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { availableTags } from '../../constants/available-tags';

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
      tagName: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      parentTagName: ''
    });
  }
  filterStates(name: string) {
    return this.availableTags.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  constructor(private _formBuilder: FormBuilder) {
    this.stateCtrl = new FormControl();
    this.filteredAvailableTags = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterStates(state) : this.availableTags.slice())
      );
  }
}
