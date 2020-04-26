export enum Sensor {
  POOL = '28-0516a1d737ff'
}

export interface CurrentTemperature {
  time: Date;
  meanValue: number;
  dataPoints: number;
  location: Sensor;
  min: number;
  max: number;
}
