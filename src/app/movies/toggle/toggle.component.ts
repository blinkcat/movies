import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { MediatorQuery } from '../state/mediator.query';
import { MovieType } from '../state/movies/movies.store';

interface Item {
  label: string;
  link: string;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-toggle]',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleComponent {
  items$ = this.query.selectedType$.pipe(map(this.buildToggleItems.bind(this)));

  private readonly toggleItemMap = {
    [MovieType.popular]: { label: 'Popular', link: '/movies/popular' },
    [MovieType.nowPlaying]: {
      label: 'Now Playing',
      link: '/movies/now-playing'
    },
    [MovieType.topRated]: { label: 'Top Rated', link: '/movies/top-rated' },
    [MovieType.upcoming]: { label: 'Upcoming', link: '/movies/upcoming' }
  };

  constructor(private query: MediatorQuery) {}

  trackByFn(item: Item) {
    return item.label;
  }

  buildToggleItems(type: MovieType) {
    return Object.keys(this.toggleItemMap).map(
      index =>
        ({
          label: (this.toggleItemMap as any)[index].label,
          link: (this.toggleItemMap as any)[index].link
        } as Item)
    );
  }
}
