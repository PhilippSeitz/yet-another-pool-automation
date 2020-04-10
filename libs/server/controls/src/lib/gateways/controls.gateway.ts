import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Socket } from 'net';
import { ControlUpdate } from '@pool/data';
import { GpioPinsService } from '../services/gpio-pins/gpio-pins.service';

@WebSocketGateway()
export class ControlsGateway {
  @WebSocketServer() server: Socket;

  constructor(private gpio: GpioPinsService) {}

  @SubscribeMessage('toggle')
  handleToggle(client: Socket, data: ControlUpdate) {
    client.emit('ackn', data);
    this.gpio.update(data.id, data.on);
    this.server.emit('update', data);
  }
}
