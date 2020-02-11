import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', redirectTo: '/movies', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
