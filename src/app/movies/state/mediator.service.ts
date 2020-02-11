import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Store, transaction } from '@datorama/akita';
import { combineLatest, EMPTY, of } from 'rxjs';
import { tap, finalize, take, filter, switchMap } from 'rxjs/operators';

import { MoviesStore, MovieType } from './movies/movies.store';
import { Movie } from './movies/movie.model';
import { PopularStore } from './popular/popular.store';
import { NowPlayingStore } from './now-playing/now-playing.store';
import { TopRatedStore } from './top-rated/top-rated.store';
import { UpcomingStore } from './upcoming/upcoming.store';
import { SearchMovieStore } from './search-movie/search-movie.store';
import { MediatorQuery } from './mediator.query';
import { Pagination } from './pagination';

interface ApiResponse {
  page?: number;
  results?: Movie[];
  total_results?: number;
  total_pages?: number;
}

@Injectable({ providedIn: 'root' })
export class MediatorService {
  private readonly API_URL = {
    [MovieType.popular]: '/movie/popular',
    [MovieType.nowPlaying]: '/movie/now_playing',
    [MovieType.topRated]: '/movie/top_rated',
    [MovieType.upcoming]: '/movie/upcoming',
    [MovieType.search]: '/search/movie'
  };

  private readonly ApiResponseKey = makeStateKey<ApiResponse>(
    'first-page-data'
  );

  constructor(
    private httpClient: HttpClient,
    private moviesStore: MoviesStore,
    private popularStore: PopularStore,
    private nowPlayingStore: NowPlayingStore,
    private topRatedStore: TopRatedStore,
    private upcomingStore: UpcomingStore,
    private searchMovieStore: SearchMovieStore,
    private mediatorQuery: MediatorQuery,
    @Inject(PLATFORM_ID) private platformId: object,
    private transferState: TransferState
  ) {}

  fetchFirstPage() {
    return this.mediatorQuery.hasNeverFetchedSelectedTypeMovies$
      .pipe(
        take(1),
        filter(should => should),
        switchMap(() => this.mediatorQuery.selectedType$),
        take(1),
        switchMap(type => this.fetchMovies(type))
      )
      .subscribe();
  }

  fetchNextPage() {
    return combineLatest([
      this.mediatorQuery.selectedType$,
      this.mediatorQuery.anyMoreSelectedTypeMovies$,
      this.mediatorQuery.pageOfSelectedTypeMovies$
    ])
      .pipe(
        take(1),
        filter(([_, hasMore, __]) => !!hasMore),
        switchMap(([type, _, page]) => this.fetchMovies(type, (page || 0) + 1))
      )
      .subscribe();
  }

  @transaction()
  searchMovies(query: string) {
    this.searchMovieStore.reset();
    this.searchMovieStore.update({ query });

    return this.fetchMovies(MovieType.search);
  }

  setSelectedMovieType(type: MovieType) {
    this.moviesStore.update(state => ({
      ui: { ...state.ui, selectedType: type }
    }));
  }

  toggleSearchLink(show?: boolean) {
    if (typeof show !== 'boolean') {
      this.moviesStore.update(state => ({
        ui: { ...state.ui, searchLinkVisible: !state.ui.searchLinkVisible }
      }));
    } else {
      this.moviesStore.update(state => ({
        ui: {
          ...state.ui,
          searchLinkVisible: show
        }
      }));
    }
  }

  toggleCloseLink(show?: boolean) {
    if (typeof show !== 'boolean') {
      this.moviesStore.update(state => ({
        ui: { ...state.ui, closeLinkVisible: !state.ui.closeLinkVisible }
      }));
    } else {
      this.moviesStore.update(state => ({
        ui: {
          ...state.ui,
          closeLinkVisible: show
        }
      }));
    }
  }

  clearSearchResults() {
    this.searchMovieStore.reset();
  }

  private fetchMovies(type = MovieType.popular, page = 1) {
    if (!this.mediatorQuery.isLoading(type)) {
      this.getSelectedStore(type).setLoading(true);

      return this.getMovies(type, page).pipe(
        tap(res => this.fillStoreWithData(type, res)),
        finalize(() => this.getSelectedStore(type).setLoading(false))
      );
    } else {
      return EMPTY;
    }
  }

  private fillStoreWithData(type: MovieType, data: ApiResponse) {
    if (data.results == null) {
      return;
    }

    this.moviesStore.add(data.results);

    this.getSelectedStore(type).update(state => {
      if (
        data.page == null ||
        data.results == null ||
        data.total_pages == null
      ) {
        return state;
      }

      return {
        // tslint:disable-next-line: no-non-null-assertion
        ids: [...state.ids, ...data.results.map(movie => movie.id!)],
        page: data.page,
        totalPages: data.total_pages,
        totalResults: data.total_results,
        hasMore: data.page < data.total_pages
      };
    });
  }

  private getMovies(type: MovieType, page: number) {
    if (this.transferState.hasKey(this.ApiResponseKey)) {
      const res = this.transferState.get<ApiResponse>(this.ApiResponseKey, {});

      this.transferState.remove(this.ApiResponseKey);

      return of(res);
    }

    return this.httpClient
      .get<ApiResponse>(this.API_URL[type], {
        params:
          type === MovieType.search
            ? {
                query: this.mediatorQuery.searchQueryStr || '',
                page: page + ''
              }
            : {
                page: '' + page
              }
      })
      .pipe(
        tap(res => {
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(this.ApiResponseKey, res);
          }
        })
      );
  }

  private getSelectedStore(type: MovieType): Store<Pagination> {
    switch (type) {
      case MovieType.popular:
        return this.popularStore;
      case MovieType.nowPlaying:
        return this.nowPlayingStore;
      case MovieType.topRated:
        return this.topRatedStore;
      case MovieType.upcoming:
        return this.upcomingStore;
      case MovieType.search:
        return this.searchMovieStore;
      default:
        return this.popularStore;
    }
  }
}
