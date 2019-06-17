import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconLinkComponent } from './icon-link/icon-link.component';

@NgModule({
  declarations: [IconLinkComponent],
  exports: [IconLinkComponent],
  imports: [CommonModule]
})
export class SharedModule {}
