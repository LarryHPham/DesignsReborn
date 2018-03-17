import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.css']
})
export class FilterBoxComponent implements OnInit {
  @Input() filters:any;
  @Output() filterCheckBox: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  filterActive(event){
    this.filterCheckBox.emit({
      checked: event.target.checked,
      value: event.target.value,
      name: event.target.name
    });
  }
}
