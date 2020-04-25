import { Injectable } from '@nestjs/common';
import { Gpio } from 'onoff';

const elements = [
  {
    pin: 17,
    description: 'Relay 1 / Pumpe'
  },
  {
    pin: 18,
    description: 'Relay 2 / Gegenstrom'
  },
  {
    pin: 27,
    description: 'Relay 3 / Licht Pool'
  },
  {
    pin: 22,
    description: 'Relay 4 / Licht Wand'
  },
  {
    pin: 23,
    description: 'Relay 5 / -'
  },
  {
    pin: 24,
    description: 'Relay 6 / -'
  },
  {
    pin: 13,
    description: 'Relay 7 / -'
  },
  {
    pin: 19,
    description: 'Relay 8 / -'
  }
];

@Injectable()
export class GpioService {
  gpioMap = new Map<number, Gpio>();
  constructor() {
    elements.forEach(element => {
      this.gpioMap.set(element.pin, new Gpio(element.pin, 'out'));
    });
  }

  on(id: number) {
    return this.gpioMap.get(id).write(1);
  }

  off(id: number) {
    return this.gpioMap.get(id).write(0);
  }
}
