import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'category-filters',
  templateUrl: './category-filters.component.html',
  styleUrls: ['./category-filters.component.css']
})
export class CategoryFiltersComponent implements OnInit {
  @Input() filters:any;
  @Output() filterCheckBox: EventEmitter<any> = new EventEmitter();

  constructor() { }

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
