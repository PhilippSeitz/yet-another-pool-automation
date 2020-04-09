import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleCardComponent } from './components/toggle-card/toggle-card.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { RunDiagramComponent } from './components/run-diagram/run-diagram.component';

const components = [ToggleCardComponent, ToggleComponent, RunDiagramComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components
})
export class ViewSharedModule {}
