import { Component, Input } from '@angular/core';

type IconType = 'search' | 'close';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[shared-icon-link]',
  templateUrl: 'icon-link.component.html',
  styles: [
    `
      :host {
        display: inline-block;
        width: 24px;
        height: 24px;
      }

      .icon {
        fill: #fff;
      }
    `
  ]
})
export class IconLinkComponent {
  @Input() type: IconType = 'search';
}
