import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { switchMap, map } from 'rxjs/operators';

import { MoviesQuery } from './movies/movies.query';
import { PopularQuery } from './popular/popular.query';
import { NowPlayingQuery } from './now-playing/now-playing.query';
import { MovieType } from './movies/movies.store';
import { UpcomingQuery } from './upcoming/upcoming.query';
import { TopRatedQuery } from './top-rated/top-rated.query';
import { SearchMovieQuery } from './search-movie/search-movie.query';
import { Pagination } from './pagination';

@Injectable({ providedIn: 'root' })
export class MediatorQuery {
  // #region selectedType
  readonly selectedType$ = this.moviesQuery.select(
    state => state.ui.selectedType
  );

  readonly selectedTypeMovies$ = this.selectedType$.pipe(
    switchMap(type =>
      this.getSelectedQuery(type)
        .select('ids')
        .pipe(switchMap(ids => this.moviesQuery.selectMany(ids)))
    )
  );

  readonly pageOfSelectedTypeMovies$ = this.selectedType$.pipe(
    switchMap(type => this.getSelectedQuery(type).select('page'))
  );

  readonly hasNeverFetchedSelectedTypeMovies$ = this.pageOfSelectedTypeMovies$.pipe(
    map(page => (page ? false : true))
  );

  readonly anyMoreSelectedTypeMovies$ = this.selectedType$.pipe(
    switchMap(type => this.getSelectedQuery(type).select('hasMore'))
  );

  readonly selectedTypeLoading$ = this.selectedType$.pipe(
    switchMap(type => this.getSelectedQuery(type).selectLoading())
  );

  get selectedType() {
    return this.moviesQuery.getValue().ui.selectedType;
  }

  get searchQueryStr() {
    return this.searchMovieQuery.getValue().query;
  }
  // #endregion

  // #region ui
  readonly searchLinkVisible$ = this.moviesQuery.select(
    state => state.ui.searchLinkVisible
  );

  readonly closeLinkVisible$ = this.moviesQuery.select(
    state => state.ui.closeLinkVisible
  );
  // #endregion

  constructor(
    private moviesQuery: MoviesQuery,
    private popularQuery: PopularQuery,
    private nowPlayingQuery: NowPlayingQuery,
    private upcomingQuery: UpcomingQuery,
    private topRatedQuery: TopRatedQuery,
    private searchMovieQuery: SearchMovieQuery
  ) {}

  isLoading(type: MovieType) {
    return this.getSelectedQuery(type).getValue().loading;
  }

  private getSelectedQuery(type: MovieType): Query<Pagination> {
    switch (type) {
      case MovieType.popular:
        return this.popularQuery;
      case MovieType.nowPlaying:
        return this.nowPlayingQuery;
      case MovieType.topRated:
        return this.topRatedQuery;
      case MovieType.upcoming:
        return this.upcomingQuery;
      case MovieType.search:
        return this.searchMovieQuery;
      default:
        return this.popularQuery;
    }
  }
}
