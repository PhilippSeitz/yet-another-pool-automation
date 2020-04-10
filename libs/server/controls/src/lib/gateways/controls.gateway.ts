import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class ControlsGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('woah');
    return 'Hello world!';
  }
}
