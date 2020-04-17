import { Component, OnInit } from '@angular/core';
import { ControlsFacade } from '@pool/view/state/controls';

@Component({
  selector: 'pool-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loaded$ = this.controlsFacade$.loaded$;
  isOffline$ = this.controlsFacade$.isOffline$;

  constructor(private controlsFacade$: ControlsFacade) {}

  ngOnInit(): void {}
}
