import { Injectable, Inject } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { TmdbConfig, TMDB_CONFIG } from '../tmdb.config';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(@Inject(TMDB_CONFIG) private tmdbConfig: TmdbConfig) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(
      req.clone({
        url: this.tmdbConfig.apiEndPoint + req.url,
        setParams: {
          api_key: this.tmdbConfig.apiKey
        }
      })
    );
  }
}
