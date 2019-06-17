import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UpcomingStore, UpcomingState } from './upcoming.store';

@Injectable({ providedIn: 'root' })
export class UpcomingQuery extends Query<UpcomingState> {
  constructor(protected store: UpcomingStore) {
    super(store);
  }
}
