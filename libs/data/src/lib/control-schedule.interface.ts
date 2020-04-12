export interface ControlOperation {
  on: boolean;
}

export interface ControlSchedule {
  controlId: string;
  operations: ControlOperation[];
}
