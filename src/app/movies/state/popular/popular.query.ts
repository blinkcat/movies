import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { PopularStore, PopularState } from './popular.store';

@Injectable({ providedIn: 'root' })
export class PopularQuery extends Query<PopularState> {
  constructor(protected store: PopularStore) {
    super(store);
  }
}
