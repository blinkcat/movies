import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TMDB_CONFIG, defaultConfig } from './tmdb.config';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: TMDB_CONFIG,
      useValue: defaultConfig
    },
    httpInterceptorProviders
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      const msg = `ModuleName has already been loaded.
        Import ModuleName once, only, in the root AppModule.`;
      throw new Error(msg);
    }
  }
}
