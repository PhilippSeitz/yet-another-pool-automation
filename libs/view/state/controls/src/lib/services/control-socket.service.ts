import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

export const environment = {
  production: false,
  SOCKET_ENDPOINT: 'http://localhost:3333'
};

@Injectable({
  providedIn: 'root'
})
export class ControlSocketService {
  socket: SocketIOClient.Socket;

  constructor() {
    console.log('huhu');
    this.setupSocketConnection();
  }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.emit('message', 'Hello there from Angular.');
  }
}
