import { Module } from '@nestjs/common';
import {
  MqttClientService,
  CLIENT_ID
} from './services/mqtt-client/mqtt-client.service';

@Module({})
export class ServerMqttModule {
  public static forRoot(clientId: string) {
    return {
      ngModule: ServerMqttModule,
      providers: [MqttClientService, { provide: CLIENT_ID, useValue: clientId }]
    };
  }
}
