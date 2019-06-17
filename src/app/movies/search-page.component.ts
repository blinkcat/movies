import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { transaction } from '@datorama/akita';
import { Subject, Observable } from 'rxjs';
import {
  filter,
  distinctUntilChanged,
  debounceTime,
  takeUntil,
  switchMap,
  tap
} from 'rxjs/operators';

import { MediatorService } from './state/mediator.service';
import { SearchComponent } from './search/search.component';
import { MovieType } from './state/movies/movies.store';
import { MediatorQuery } from './state/mediator.query';
import { Movie } from './state/movies/movie.model';

@Component({
  selector: 'app-search-page',
  template: `
    <app-search
      #search
      class="page-search"
      [(searchValue)]="searchValue"
    ></app-search>
    <app-search-guide *ngIf="isSearchValueEmpty()"></app-search-guide>
    <app-list
      *ngIf="!isSearchValueEmpty()"
      [column]="1"
      [list]="list$ | async"
      [listItem]="customItem"
      [anyMore]="anyMore$ | async"
      (scrolled)="handleScroll()"
    ></app-list>
    <ng-template let-item #customItem>
      <app-search-card [movie]="item"></app-search-card>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
        padding-top: 16px;
      }

      .page-search {
        position: -webkit-sticky;
        position: sticky;
        top: 14px;
        margin-bottom: 16px;
        z-index: 20;
      }
      .page-item {
        width: 100;
      }
    `
  ]
})
export class SearchPageComponent implements OnInit, AfterViewInit, OnDestroy {
  searchValue = '';
  list$!: Observable<Movie[]>;
  anyMore$ = this.query.anyMoreSelectedTypeMovies$;

  @ViewChild('search', { static: false }) searchComp!: SearchComponent;

  private destory = new Subject();

  constructor(private service: MediatorService, private query: MediatorQuery) {}

  ngOnInit() {
    setTimeout(() => this.init());
  }

  ngAfterViewInit() {
    this.searchComp.searchValueChange
      .asObservable()
      .pipe(
        tap(value => {
          if (this.isSearchValueEmpty(value)) {
            this.service.clearSearchResults();
          }
        }),
        filter(value => !this.isSearchValueEmpty(value)),
        debounceTime(600),
        distinctUntilChanged(),
        switchMap(value => this.service.searchMovies(value)),
        takeUntil(this.destory)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.service.clearSearchResults();
    this.handleToolbar(true);
    this.destory.next();
  }

  handleScroll() {
    this.service.fetchNextPage();
  }

  isSearchValueEmpty(value?: string) {
    value = value || this.searchValue;
    return value == null || value.trim() === '';
  }

  @transaction()
  private init() {
    this.handleToolbar(false);
    this.service.setSelectedMovieType(MovieType.search);
    this.list$ = this.query.selectedTypeMovies$;
  }

  @transaction()
  private handleToolbar(leave = false) {
    this.service.toggleSearchLink(leave);
    this.service.toggleCloseLink(!leave);
  }
}
