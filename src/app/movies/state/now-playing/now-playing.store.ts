import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Pagination } from '../pagination';

// tslint:disable-next-line: no-empty-interface
export interface NowPlayingState extends Pagination {}

export function createInitialState(): NowPlayingState {
  return {
    page: 0,
    ids: [],
    loading: false
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'now-playing' })
export class NowPlayingStore extends Store<NowPlayingState> {
  constructor() {
    super(createInitialState());
  }
}
