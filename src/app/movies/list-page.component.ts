import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, pluck } from 'rxjs/operators';
import { MediatorService } from './state/mediator.service';
import { MediatorQuery } from './state/mediator.query';
import { MovieType } from './state/movies/movies.store';

@Component({
  selector: 'app-list-page',
  template: `
    <nav app-toggle class="page-toggle"></nav>
    <app-list
      [listItem]="customItem"
      [list]="list$ | async"
      [anyMore]="anyMore$ | async"
      (scrolled)="handleScroll()"
    ></app-list>
    <ng-template let-item #customItem>
      <app-card [movie]="item"></app-card>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
        padding-top: 16px;
      }
      .page-toggle {
        top: 16px;
        position: -webkit-sticky;
        position: sticky;
        z-index: 1;
      }
    `
  ]
})
export class ListPageComponent implements OnInit {
  list$ = this.query.selectedTypeMovies$;
  anyMore$ = this.query.anyMoreSelectedTypeMovies$;

  constructor(
    private route: ActivatedRoute,
    private query: MediatorQuery,
    private service: MediatorService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(take(1), pluck('type'))
      .subscribe((type: MovieType) => {
        this.service.setSelectedMovieType(type);
        this.service.fetchFirstPage();
      });
  }

  handleScroll() {
    this.service.fetchNextPage();
  }
}
