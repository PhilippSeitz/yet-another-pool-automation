import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit
} from '@nestjs/websockets';
import { Socket } from 'net';
import { ControlUpdate } from '@pool/data';
import { GpioPinsService } from '../services/gpio-pins/gpio-pins.service';
import { SocketTypes } from '@pool/data';
import * as moment from 'moment';
import { tap, map } from 'rxjs/operators';

@WebSocketGateway()
export class ControlsGateway implements OnGatewayInit {
  constructor(private gpio: GpioPinsService) {}
  afterInit(server: Socket) {
    this.gpio.controlUpdate$.subscribe(update =>
      server.emit(SocketTypes.update, update)
    );
  }

  @SubscribeMessage(SocketTypes.getAll)
  getAll(client: Socket) {
    return this.gpio.getAll().pipe(
      map(value => [...value.values()]),
      tap(data => client.emit(SocketTypes.sendAll, data))
    );
  }

  @SubscribeMessage(SocketTypes.toggle)
  handleToggle(client: Socket, data: ControlUpdate) {
    return this.gpio.update(data.id, data.on);
  }

  @SubscribeMessage(SocketTypes.startQuickAction)
  startQuickAction(client: Socket, data: any) {
    return this.gpio.startQuickAction({ start: moment(), duration: 1 });
  }
}
