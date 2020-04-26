import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewSharedModule } from '@pool/view/shared';
import { CurrentTemperatureComponent } from './components/current-temperature/current-temperature.component';
import { TemperatureGraphComponent } from './components/temperature-graph/temperature-graph.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DashboardComponent }
    ]),
    ViewSharedModule
  ],
  declarations: [
    DashboardComponent,
    CurrentTemperatureComponent,
    TemperatureGraphComponent
  ]
})
export class ViewDashboardModule {}
