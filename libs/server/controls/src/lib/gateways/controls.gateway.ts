import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Socket } from 'net';
import { ControlUpdate } from '@pool/data';
import { GpioPinsService } from '../services/gpio-pins/gpio-pins.service';
import { SocketTypes } from '@pool/data';
import * as moment from 'moment';

@WebSocketGateway()
export class ControlsGateway {
  @WebSocketServer() server: Socket;

  constructor(private gpio: GpioPinsService) {
    this.gpio.controlUpdate$.subscribe(update =>
      this.server.emit(SocketTypes.update, update)
    );
  }

  @SubscribeMessage(SocketTypes.toggle)
  handleToggle(client: Socket, data: ControlUpdate) {
    return this.gpio.update(data.id, data.on);
  }

  @SubscribeMessage(SocketTypes.startQuickAction)
  startQuickAction(client: Socket, data: any) {
    this.gpio.startQuickAction({ start: moment(), duration: 1 });
  }
}
