import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject, Observable } from 'rxjs';
import { ControlUpdate, SocketTypes } from '@pool/data';

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
    this.socket = io('/');
    this.socket.on(SocketTypes.update, (message: ControlUpdate) =>
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
