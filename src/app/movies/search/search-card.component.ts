import { Component, OnInit, Inject, Input } from '@angular/core';
import { TmdbConfig, TMDB_CONFIG } from 'src/app/core/tmdb.config';
import { Movie } from '../state/movies/movie.model';

@Component({
  selector: 'app-search-card',
  template: `
    <img class="post" [attr.src]="posterPath" />
    <div class="detail">
      <div class="title">{{ movie?.title }}</div>
      <div>
        <span class="vote" [class.high]="movie?.vote_average > 7"
          >{{ movie?.vote_average }} User Score</span
        >
        <span class="date">{{ movie?.release_date }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
      }
      .post {
        display: block;
        width: 100px;
        border-radius: 2px;
      }
      .detail {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 16px;
        color: #fff;
      }
      .title {
        font-size: 18px;
        padding-bottom: 8px;
      }
      .vote {
        color: #aaa;
        font-size: 14px;
        font-style: italic;
        margin-right: 10px;
      }
      .vote.high {
        color: #3bb33b;
      }
      .date {
        font-size: 14px;
      }
    `
  ]
})
export class SearchCardComponent implements OnInit {
  @Input() movie!: Movie;

  get posterPath() {
    if (this.movie) {
      return (
        this.tmdbConfig.imageBaseUrl +
        this.tmdbConfig.posterSize +
        this.movie.poster_path
      );
    } else {
      return '';
    }
  }

  constructor(@Inject(TMDB_CONFIG) private tmdbConfig: TmdbConfig) {}

  ngOnInit() {}
}
