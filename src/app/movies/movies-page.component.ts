import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MediatorQuery } from './state/mediator.query';

@Component({
  selector: 'app-movies-page',
  template: `
    <app-toolbar class="page-toolbar">
      <span class="page-spacer"></span>
      <a
        shared-icon-link
        type="search"
        routerLink="/movies/search"
        *ngIf="searchLinkVisible$ | async"
      ></a>
      <a
        shared-icon-link
        type="close"
        routerLink="../movies"
        *ngIf="closeLinkVisible$ | async"
      ></a>
    </app-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-top: 54px;
      }

      .page-toolbar {
        position: fixed;
        top: 0;
      }

      .page-spacer {
        flex: 1 1 auto;
      }
    `
  ]
})
export class MoviesPageComponent implements OnInit {
  searchLinkVisible$ = this.query.searchLinkVisible$;
  closeLinkVisible$ = this.query.closeLinkVisible$;

  constructor(private titleService: Title, private query: MediatorQuery) {}

  ngOnInit() {
    this.titleService.setTitle('movies');
  }
}
