import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromControls from './+state/controls.reducer';
import { ControlsEffects } from './+state/controls.effects';
import { ControlsFacade } from './+state/controls.facade';
import { ControlSocketService } from './services/control-socket.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromControls.CONTROLS_FEATURE_KEY,
      fromControls.reducer
    ),
    EffectsModule.forFeature([ControlsEffects])
  ],
  providers: [ControlsFacade, ControlSocketService]
})
export class StateControlsModule {}
