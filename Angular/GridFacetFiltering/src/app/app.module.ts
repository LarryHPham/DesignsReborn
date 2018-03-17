import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FacetFilterService } from './service/facet-filter.service';
import { AppComponent } from './app.component';
import { CategoryFiltersComponent } from './component/category-filters/category-filters.component';
import { FilterBoxComponent } from './component/filter-box/filter-box.component';
import { TextCasePipe } from './pipe/text-case.pipe';
import { ItemTemplate1Component } from './component/item-template1/item-template1.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryFiltersComponent,
    FilterBoxComponent,
    TextCasePipe,
    ItemTemplate1Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [FacetFilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
