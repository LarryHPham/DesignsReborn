import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTemplate1Component } from './item-template1.component';

describe('ItemTemplate1Component', () => {
  let component: ItemTemplate1Component;
  let fixture: ComponentFixture<ItemTemplate1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemTemplate1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTemplate1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
