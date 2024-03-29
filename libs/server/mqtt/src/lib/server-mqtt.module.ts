import { Module, DynamicModule } from '@nestjs/common';
import {
  MqttClientService,
  CLIENT_ID
} from './services/mqtt-client/mqtt-client.service';

@Module({})
export class ServerMqttModule {
  public static forRoot(clientId: string): DynamicModule {
    return {
      module: ServerMqttModule,
      providers: [
        MqttClientService,
        { provide: CLIENT_ID, useValue: clientId }
      ],
      exports: [MqttClientService]
    };
  }
}
