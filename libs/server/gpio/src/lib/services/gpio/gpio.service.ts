import { Injectable } from '@nestjs/common';
import { Gpio } from 'onoff';

const elements = [
  {
    pin: 17,
    name: 'Pumpe'
  },
  {
    pin: 22,
    name: 'Gegenstromanlage'
  },
  {
    pin: 10,
    name: 'Pool-Beleuchtung'
  },
  {
    pin: 9,
    name: 'Licht'
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
