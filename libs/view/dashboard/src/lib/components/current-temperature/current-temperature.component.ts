import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pool-current-temperature',
  templateUrl: './current-temperature.component.html',
  styleUrls: ['./current-temperature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentTemperatureComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
