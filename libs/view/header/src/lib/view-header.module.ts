import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { StateControlsModule } from '@pool/view/state/controls';

@NgModule({
  imports: [CommonModule, StateControlsModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class ViewHeaderModule {}
