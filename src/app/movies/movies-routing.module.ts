import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesPageComponent } from './movies-page.component';
import { ListPageComponent } from './list-page.component';
import { SearchPageComponent } from './search-page.component';
import { MovieType } from './state/movies/movies.store';

const routes: Routes = [
  {
    path: 'movies',
    component: MoviesPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'popular',
        pathMatch: 'full'
      },
      {
        path: 'popular',
        component: ListPageComponent,
        data: {
          type: MovieType.popular
        }
      },
      {
        path: 'now-playing',
        component: ListPageComponent,
        data: {
          type: MovieType.nowPlaying
        }
      },
      {
        path: 'top-rated',
        component: ListPageComponent,
        data: {
          type: MovieType.topRated
        }
      },
      {
        path: 'upcoming',
        component: ListPageComponent,
        data: {
          type: MovieType.upcoming
        }
      },
      {
        path: 'search',
        component: SearchPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {}
