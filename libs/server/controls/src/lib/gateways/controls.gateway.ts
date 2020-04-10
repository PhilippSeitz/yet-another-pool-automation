import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
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
  @SubscribeMessage('toggle')
  handleToggle(client: Socket, data: ControlUpdate) {
    client.emit('update', data);
    console.log(data);
  }
}
