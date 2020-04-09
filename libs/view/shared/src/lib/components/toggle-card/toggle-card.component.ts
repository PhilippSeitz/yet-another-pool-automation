import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pool-toggle-card',
  templateUrl: './toggle-card.component.html',
  styleUrls: ['./toggle-card.component.scss']
})
export class ToggleCardComponent implements OnInit {
  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  click(event: MouseEvent) {
    this.checked = !this.checked;
    event.preventDefault();
  }
}
