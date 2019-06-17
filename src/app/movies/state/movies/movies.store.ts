import { Injectable } from '@angular/core';
import { Movie } from './movie.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export enum MovieType {
  popular,
  nowPlaying,
  topRated,
  upcoming,
  search
}

export interface MoviesState extends EntityState<Movie, number> {
  ui: {
    selectedType: MovieType;
    searchLinkVisible: boolean;
    closeLinkVisible: boolean;
  };
}

const initialState = {
  loading: false,
  ui: {
    selectedType: MovieType.popular,
    searchLinkVisible: true,
    closeLinkVisible: false
  }
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'movies' })
export class MoviesStore extends EntityStore<MoviesState> {
  constructor() {
    super(initialState);
  }
}
