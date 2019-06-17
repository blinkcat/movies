import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Inject
} from '@angular/core';
import { Movie } from '../state/movies/movie.model';
import { TMDB_CONFIG, TmdbConfig } from 'src/app/core/tmdb.config';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
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
