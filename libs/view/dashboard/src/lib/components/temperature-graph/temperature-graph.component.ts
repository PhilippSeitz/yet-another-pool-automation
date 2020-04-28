import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DashboardFacade } from '../../+state/dashboard.facade';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'pool-temperature-graph',
  templateUrl: './temperature-graph.component.html',
  styleUrls: ['./temperature-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemperatureGraphComponent implements OnInit {
  history$ = this.dashboardFacade.poolTemperatureHistory$;
  values$ = this.dashboardFacade.poolTemperatureHistoryValues$.pipe(
    map(val =>
      val
        .filter(value => !!value.value)
        .map(x => ({ ...x, time: new Date(x.time) }))
    )
  );

  constructor(private dashboardFacade: DashboardFacade) {}

  ngOnInit(): void {}
}
