import {
  Component,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { Movie } from '../state/movies/movie.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  @Input() listItem!: TemplateRef<any>;
  @Input() list!: Movie[];
  @Input() anyMore!: boolean;
  @Input() column = 2;
  @Output() scrolled = new EventEmitter();

  clss: any;

  ngOnInit() {
    this.clss = {
      item: true,
      [`column-${this.column}`]: true
    };
  }

  trackByFn(item: Movie) {
    return item.id;
  }
}
