import { Component, OnInit } from '@angular/core';
import { ControlsFacade } from '@pool/view/state/controls';
import { environment } from '@env/client';

@Component({
  selector: 'pool-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  controls$ = this.controlsFacade.allControls$;
  loaded$ = this.controlsFacade.loaded$;
  offline$ = this.controlsFacade.isOffline$;
  production = environment.production;

  constructor(private controlsFacade: ControlsFacade) {}

  ngOnInit(): void {}

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
