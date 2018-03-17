import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

export interface filtersList {
  filterName: string;
  filterCount: number;
  filterActive: boolean;
}


@Injectable()
export class FacetFilterService {
  serviceData: any;
  filterCategories: Array<filtersList> = [];
  activeFilters: Array<string> = [];
  displayItems: any = [];
  unDisplayedItems: Array<any> = [];

  constructor(private _http: HttpClient, ) {
  }

  get(url: string) {
    return this._http.get(url)
      .pipe(
      map(res => {
        // set the raw json data as service Data to be pulled for filtering
        this.serviceData = res;

        //displayItems is the data to be manipulated that are displayed on client frontend
        this.displayItems = res;
        // create all filterable categories with provided data
        this.createBrandFilter(res);

        //return data
        return {
          rawData: res,
          filters: [
            {
              type: "Brand",
              data: this.filterCategories
            }
          ]
        };
      }),
      catchError(err => {
        console.log("catchError", err);
        return of(err);
      })
      );
  }

  createBrandFilter(data: any) {
    // create skeleton of dataSet filter
    // only to create filter list with dummy data
    var dataSet: Array<filtersList> = [];

    // from data split the names and seperate into categories 'Car Brand | Car Type'
    data.forEach(function(value, i) {
      if (value.name) {
        var brandName = value.name.split(" ");
        var name = brandName[0];

        // filter the list => dataSet to find if there are any currently existing filters if so increase it's Count
        var nameFilter = (dataSet.filter(item => item.filterName === name));
        if (nameFilter.length == 0) {
          dataSet.push({
            filterName: name,
            filterCount: 1,
            filterActive: false,
          });
        }
      }
    });

    //update the count for each since their names can be located elsewhere in string
    dataSet.forEach(function(filter, i){
      filter.filterCount = data.filter(i => i.name.includes(filter.filterName)).length;
    })

    // set filterCategories to derived dataSet
    this.filterCategories = dataSet;
  }

  filterData(filter, filterAdd){
    var self = this;
    // filter data will add or remove the filter from the active Filters array
    if(filterAdd){
      this.activeFilters.push(filter);
    }else{
      this.activeFilters = this.activeFilters.filter(e => e !== filter);
    }

    //reset unDisplayedItems to an empty array
    this.unDisplayedItems = [];

    // Use full service Data to ensure that every piece of data is checked to test against current filtersList
    // NOTE: depending on task this may not be the most optimal solution due to the fact it will always iterate through entire service Data
    this.displayItems = this.serviceData.filter(function(item){
      for(var w = 0; w < self.activeFilters.length;w++){
        // use includes() instead of indexOf() bc we want the whole word to be checked on not each character
        if(item.name.includes(self.activeFilters[w])){
          return item;
        }
      }

      // push item if it reaches this point
      self.unDisplayedItems.push(item);
    });


    // incase all filters are removed then set back to original data
    if(this.displayItems.length == 0){
      this.displayItems = this.serviceData;
      this.unDisplayedItems = this.serviceData;
    }


    // update Count of all items again
    this.filterCategories.forEach(function(filter, i){
      filter.filterCount = self.unDisplayedItems.filter(i => i.name.includes(filter.filterName)).length;
    });

    //return data
    return {
      newDisplay: this.displayItems,
      newCategories: this.filterCategories
    };
  }

}
