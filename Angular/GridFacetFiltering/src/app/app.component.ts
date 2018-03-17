import { Component } from '@angular/core';
import { FacetFilterService } from './service/facet-filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  categoryFilters: any;
  displayItems: any;

  constructor(
    private _facetFilterService: FacetFilterService
  ){
    _facetFilterService.get("https://raw.githubusercontent.com/curran/data/gh-pages/datalibExamples/cars.json")
    .subscribe(data => {
      this.categoryFilters = data.filters;
      this.displayItems = data.rawData;
    });
  }

  filterCheck(event){
    let newFilters = this._facetFilterService.filterData(event.value, event.checked);
    this.displayItems = newFilters.newDisplay;
    let newCatData = this.categoryFilters.filter(cat => cat.type === event.name);

    if(newCatData.length > 0){
      newCatData[0].data = newFilters.newCategories;
    }
  }

}
