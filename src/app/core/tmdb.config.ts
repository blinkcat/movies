import { InjectionToken } from '@angular/core';

export interface TmdbConfig {
  apiEndPoint: string;
  imageBaseUrl: string;
  backdropSize: string;
  logoSize: string;
  posterSize: string;
  profileSize: string;
  stillSize: string;
  apiKey: string;
}

export const TMDB_CONFIG = new InjectionToken<any>('tmdb.config');

// https://developers.themoviedb.org/3/getting-started/images
export const defaultConfig: TmdbConfig = {
  apiEndPoint: 'https://api.themoviedb.org/3',
  imageBaseUrl: 'https://image.tmdb.org/t/p/',
  backdropSize: 'w780',
  logoSize: 'w300',
  posterSize: 'w300',
  profileSize: 'w185',
  stillSize: 'w300',
  apiKey: '1329f6fe0ea9aee966eade5d2d5da1d4'
};
