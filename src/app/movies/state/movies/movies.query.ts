import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { MoviesStore, MoviesState } from './movies.store';

@Injectable({ providedIn: 'root' })
export class MoviesQuery extends QueryEntity<MoviesState> {
  constructor(protected store: MoviesStore) {
    super(store);
  }
}
