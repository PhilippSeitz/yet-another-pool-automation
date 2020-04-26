import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { ControlsFacade } from '@pool/view/state/controls';
import { environment } from '@env/client';
import { DashboardFacade } from '../+state/dashboard.facade';

@Component({
  selector: 'pool-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
  controls$ = this.controlsFacade.allControls$;
  loaded$ = this.controlsFacade.loaded$;
  offline$ = this.controlsFacade.isOffline$;
  production = environment.production;

  constructor(
    private controlsFacade: ControlsFacade,
    private dashboardFacade: DashboardFacade
  ) {}

  ngOnInit(): void {
    this.dashboardFacade.startPolling();
  }

  ngOnDestroy(): void {
    this.dashboardFacade.endPolling();
  }

  toggle(id: string) {
    this.controlsFacade.toggleControl(id);
  }

  startQuickAction() {
    this.controlsFacade.startQuickAction();
  }

  trackBy(index: number) {
    return index;
  }
}
