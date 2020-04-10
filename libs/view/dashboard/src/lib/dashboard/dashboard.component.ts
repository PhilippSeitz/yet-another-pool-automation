import { Component, OnInit } from '@angular/core';
import { ControlsFacade } from '@pool/view/state/controls';

@Component({
  selector: 'pool-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  controls$ = this.controlsFacade.allControls$;

  constructor(private controlsFacade: ControlsFacade) {}

  ngOnInit(): void {}

  toggle(id: string) {
    this.controlsFacade.toggleControl(id);
  }
}
