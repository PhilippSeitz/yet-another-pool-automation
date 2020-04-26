import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DashboardFacade } from '../../+state/dashboard.facade';
import { map } from 'rxjs/operators';

@Component({
  selector: 'pool-current-temperature',
  templateUrl: './current-temperature.component.html',
  styleUrls: ['./current-temperature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentTemperatureComponent implements OnInit {
  poolTemperature$ = this.dashboardFacade.poolTemperature$;
  digit$ = this.poolTemperature$.pipe(
    map(val => (val && val.meanValue ? Math.floor(val.meanValue) : '-'))
  );
  decimal$ = this.poolTemperature$.pipe(
    map(val =>
      val && val.meanValue
        ? Math.round((val.meanValue - Math.floor(val.meanValue)) * 10)
        : '-'
    )
  );

  constructor(private dashboardFacade: DashboardFacade) {}

  ngOnInit(): void {}
}
