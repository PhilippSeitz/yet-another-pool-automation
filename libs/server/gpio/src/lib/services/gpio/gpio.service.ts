import { Injectable } from '@nestjs/common';
import { Gpio } from 'onoff';
import { MqttClientService } from '@pool/server/mqtt';

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

const TOPIC = 'gpio';

@Injectable()
export class GpioService {
  gpioMap = new Map<number, Gpio>();
  constructor(private mqttClient: MqttClientService) {
    elements.forEach(element => {
      this.gpioMap.set(element.pin, new Gpio(element.pin, 'out'));
      this.mqttClient.publish(
        TOPIC,
        `gpio,location=${element.pin} value=false ${Date.now()}000000`
      );
    });
  }

  on(id: number) {
    this.mqttClient.publish(
      TOPIC,
      `gpio,location=${id} value=true ${Date.now()}000000`
    );
    return this.gpioMap.get(id).write(1);
  }

  off(id: number) {
    this.mqttClient.publish(
      TOPIC,
      `gpio,location=${id} value=false ${Date.now()}000000`
    );
    return this.gpioMap.get(id).write(0);
  }
}
