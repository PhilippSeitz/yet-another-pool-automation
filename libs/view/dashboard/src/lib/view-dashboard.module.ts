import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewSharedModule } from '@pool/view/shared';
import { CurrentTemperatureComponent } from './components/current-temperature/current-temperature.component';
import { TemperatureGraphComponent } from './components/temperature-graph/temperature-graph.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDashboard from './+state/dashboard.reducer';
import { DashboardEffects } from './+state/dashboard.effects';
import { DashboardFacade } from './+state/dashboard.facade';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DashboardComponent }
    ]),
    ViewSharedModule,
    StoreModule.forFeature(
      fromDashboard.DASHBOARD_FEATURE_KEY,
      fromDashboard.reducer
    ),
    EffectsModule.forFeature([DashboardEffects])
  ],
  declarations: [
    DashboardComponent,
    CurrentTemperatureComponent,
    TemperatureGraphComponent
  ],
  providers: [DashboardFacade]
})
export class ViewDashboardModule {}
