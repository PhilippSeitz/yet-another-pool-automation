import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewSharedModule } from '@pool/view/shared';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DashboardComponent }
    ]),
    ViewSharedModule,
  ],
  declarations: [DashboardComponent],
})
export class ViewDashboardModule {}
