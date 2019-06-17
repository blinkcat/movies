import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { TopRatedStore, TopRatedState } from './top-rated.store';

@Injectable({ providedIn: 'root' })
export class TopRatedQuery extends Query<TopRatedState> {
  constructor(protected store: TopRatedStore) {
    super(store);
  }
}
