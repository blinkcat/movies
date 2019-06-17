import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-guide',
  template: `
    <h1 class="arrow">☝️</h1>
    <p class="large">Search for movies</p>
    <p class="small">use the search bar above</p>
  `,
  styles: [
    `
      :host {
        color: #fff;
        text-align: center;
        display: block;
      }
      .arrow {
        margin: 120px auto 40px;
      }
      .large {
        font-size: 22px;
        font-weight: 600;
        text-align: center;
      }
      .small {
        color: rgb(122, 140, 153);
        font-size: 14px;
      }
    `
  ]
})
export class SearchGuideComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
