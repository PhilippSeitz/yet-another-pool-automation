import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pool-temperature-graph',
  templateUrl: './temperature-graph.component.html',
  styleUrls: ['./temperature-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemperatureGraphComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
