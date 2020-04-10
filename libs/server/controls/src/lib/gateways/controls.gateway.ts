import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Socket } from 'net';
import { Control, ControlUpdate } from '@pool/data';

const controls: Control[] = [
  { id: '1', name: 'Pumpe', on: false },
  { id: '2', name: 'Licht', on: true },
  { id: '3', name: 'Pool Licht', on: false },
  { id: '4', name: 'Gegenstromanlage', on: true }
];

@WebSocketGateway()
export class ControlsGateway {
  @WebSocketServer() server: Socket;

  @SubscribeMessage('toggle')
  handleToggle(client: Socket, data: ControlUpdate) {
    client.emit('ackn', data);
    this.server.emit('update', data);
  }
}
