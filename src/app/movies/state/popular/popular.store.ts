import { Injectable } from '@angular/core';
import { Store, StoreConfig, ID } from '@datorama/akita';
import { Pagination } from '../pagination';

// tslint:disable-next-line: no-empty-interface
export interface PopularState extends Pagination {}

export function createInitialState(): PopularState {
  return {
    page: 0,
    ids: [],
    loading: false
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'popular' })
export class PopularStore extends Store<PopularState> {
  constructor() {
    super(createInitialState());
  }
}
