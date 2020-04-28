import {
  Component,
  ChangeDetectionStrategy,
  OnChanges,
  Input,
  ViewEncapsulation
} from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import { OnInit } from '@angular/core';

@Component({
  selector: 'pool-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent implements OnChanges, OnInit {
  @Input()
  data: any[];

  title = 'Line Chart';

  private margin = { top: 20, right: 20, bottom: 30, left: 50 };

  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;
  private area: d3Shape.Area<[number, number]>;
  width = 800;
  height = 400;

  constructor() {}

  ngOnChanges() {
    if (!this.svg && this.data && this.data.length > 0) {
      this.initSvg();
      this.initAxis();
      // this.drawAxis();
      this.drawLine();
    }
  }

  ngOnInit() {}

  private initSvg() {
    d3.select('#graph > *').remove();
    this.svg = d3.select('#graph');
    d3.select('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`);
  }

  private initAxis() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(this.data, d => d.time));
    this.y.domain(d3Array.extent(this.data, d => d.value));
  }

  private drawLine() {
    this.line = d3Shape
      .line()
      .curve(d3Shape.curveBasis)
      .x((d: any) => this.x(d.time))
      .y((d: any) => this.y(d.value));

    this.area = d3Shape
      .area()
      .x((d: any) => this.x(d.time))
      .y0(this.height)
      .y1((d: any) => this.y(d.value));

    this.svg
      .append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr('stroke', 'white')
      .attr('stroke-width', '7')
      .attr('fill', 'none')
      .attr('d', this.line);
    this.svg
      .append('path')
      .datum(this.data)
      .attr('fill', 'url(#grad)')
      .attr('d', this.area);
  }
}
