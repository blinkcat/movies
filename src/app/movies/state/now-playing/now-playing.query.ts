import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { NowPlayingStore, NowPlayingState } from './now-playing.store';

@Injectable({ providedIn: 'root' })
export class NowPlayingQuery extends Query<NowPlayingState> {
  constructor(protected store: NowPlayingStore) {
    super(store);
  }
}
