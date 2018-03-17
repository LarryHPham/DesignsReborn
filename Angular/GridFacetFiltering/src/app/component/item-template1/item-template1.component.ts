import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'item-template1',
  templateUrl: './item-template1.component.html',
  styleUrls: ['./item-template1.component.css']
})
export class ItemTemplate1Component implements OnInit {
  @Input() item:any;

  constructor() { }

  ngOnInit() {
  }

}
