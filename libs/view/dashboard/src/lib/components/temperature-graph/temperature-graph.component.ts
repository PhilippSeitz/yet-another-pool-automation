import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DashboardFacade } from '../../+state/dashboard.facade';

@Component({
  selector: 'pool-temperature-graph',
  templateUrl: './temperature-graph.component.html',
  styleUrls: ['./temperature-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemperatureGraphComponent implements OnInit {
  history$ = this.dashboardFacade.poolTemperatureHistory$;

  constructor(private dashboardFacade: DashboardFacade) {}

  ngOnInit(): void {}
}
