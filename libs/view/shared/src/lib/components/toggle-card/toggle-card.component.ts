import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlsEntity } from '@pool/view/state/controls';

@Component({
  selector: 'pool-toggle-card',
  templateUrl: './toggle-card.component.html',
  styleUrls: ['./toggle-card.component.scss']
})
export class ToggleCardComponent implements OnInit {
  @Input() control: ControlsEntity;
  @Input() loading = false;
  @Output() toggle = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  click(event: MouseEvent) {
    if (this.loading) {
      return;
    }
    this.toggle.emit();
    event.preventDefault();
  }
}
