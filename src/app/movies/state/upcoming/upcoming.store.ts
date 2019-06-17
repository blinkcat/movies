import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Pagination } from '../pagination';

// tslint:disable-next-line: no-empty-interface
export interface UpcomingState extends Pagination {}

export function createInitialState(): UpcomingState {
  return {
    ids: [],
    page: 0,
    loading: false
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'upcoming' })
export class UpcomingStore extends Store<UpcomingState> {
  constructor() {
    super(createInitialState());
  }
}
