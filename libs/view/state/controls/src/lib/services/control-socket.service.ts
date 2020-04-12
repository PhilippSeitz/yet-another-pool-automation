import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject, Observable } from 'rxjs';
import { ControlUpdate } from '@pool/data';
import { SocketTypes } from '../../../../../../data/src/index';

export const environment = {
  production: false,
  SOCKET_ENDPOINT: 'http://localhost:3333'
};

@Injectable({
  providedIn: 'root'
})
export class ControlSocketService {
  socket: SocketIOClient.Socket;
  get update$(): Observable<ControlUpdate> {
    return this._update$;
  }

  private _update$ = new Subject<ControlUpdate>();

  constructor() {
    this.setupSocket();
  }

  setupSocket() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('update', (message: ControlUpdate) =>
      this._update$.next(message)
    );
  }

  toggle(update: ControlUpdate) {
    this.socket.emit(SocketTypes.toggle, update);
  }

  startQuickAction() {
    this.socket.emit(SocketTypes.startQuickAction);
  }
}
