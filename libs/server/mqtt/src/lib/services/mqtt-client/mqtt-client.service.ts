import { Injectable, Inject } from '@nestjs/common';
import * as mqtt from 'mqtt';

export const CLIENT_ID = 'CLIENT_ID';

@Injectable()
export class MqttClientService {
  client = mqtt.connect('mqtt://mqtt:1883', {
    clean: false,
    clientId: this.clientId
  });

  constructor(@Inject(CLIENT_ID) private clientId: string) {}

  publish(topic: string, message: string) {
    this.client.publish(topic, message, { qos: 1 });
  }
}
