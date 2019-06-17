import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from '../shared/shared.module';
import { MoviesRoutingModule } from './movies-routing.module';
import { ListComponent } from './list/list.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MoviesPageComponent } from './movies-page.component';
import { SearchComponent } from './search/search.component';
import { ToggleComponent } from './toggle/toggle.component';
import { CardComponent } from './card/card.component';
import { ListPageComponent } from './list-page.component';
import { SearchPageComponent } from './search-page.component';
import { SearchGuideComponent } from './search/search-guide.component';
import { SearchCardComponent } from './search/search-card.component';

@NgModule({
  declarations: [
    MoviesPageComponent,
    ListComponent,
    ToolbarComponent,
    SearchComponent,
    ToggleComponent,
    CardComponent,
    SearchGuideComponent,
    ListPageComponent,
    SearchPageComponent,
    SearchCardComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    InfiniteScrollModule,
    SharedModule
  ]
})
export class MoviesModule {}
