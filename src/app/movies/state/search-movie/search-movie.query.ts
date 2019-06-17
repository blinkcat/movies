import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SearchMovieStore, SearchMovieState } from './search-movie.store';

@Injectable({ providedIn: 'root' })
export class SearchMovieQuery extends Query<SearchMovieState> {
  constructor(protected store: SearchMovieStore) {
    super(store);
  }
}
