import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Pagination } from '../pagination';

export interface SearchMovieState extends Pagination {
  query?: string;
}

export function createInitialState(): SearchMovieState {
  return {
    page: 0,
    ids: [],
    loading: false
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'search-movie', resettable: true })
export class SearchMovieStore extends Store<SearchMovieState> {
  constructor() {
    super(createInitialState());
  }
}
