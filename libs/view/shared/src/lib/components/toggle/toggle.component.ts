import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pool-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {
  @Input() checked: boolean;
  
  constructor() {}

  ngOnInit(): void {}
}
