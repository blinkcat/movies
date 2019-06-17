import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Pagination } from '../pagination';

// tslint:disable-next-line: no-empty-interface
export interface TopRatedState extends Pagination {}

export function createInitialState(): TopRatedState {
  return {
    ids: [],
    page: 0,
    loading: false
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'topRated' })
export class TopRatedStore extends Store<TopRatedState> {
  constructor() {
    super(createInitialState());
  }
}
