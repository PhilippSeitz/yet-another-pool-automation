export enum Sensor {
  POOL = '28-0516a1d737ff'
}

export interface TemperatureSnapshot {
  time: Date;
  meanValue: number;
  dataPoints: number;
  location: Sensor;
  min: number;
  max: number;
}

export interface TemperatureData {
  time: Date;
  location: Sensor;
  value: number;
}
