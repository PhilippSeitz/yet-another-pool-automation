import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject, Observable } from 'rxjs';
import { ControlUpdate, SocketTypes, Control } from '@pool/data';

@Injectable({
  providedIn: 'root'
})
export class ControlSocketService {
  socket: SocketIOClient.Socket;
  get update$(): Observable<ControlUpdate> {
    return this._update$;
  }

  get loaded$(): Observable<Control[]> {
    return this._loaded$;
  }

  private _update$ = new Subject<ControlUpdate>();
  private _loaded$ = new Subject<Control[]>();

  constructor() {
    this.setupSocket();
  }

  setupSocket() {
    this.socket = io('/');

    this.socket.on(SocketTypes.update, (message: ControlUpdate) =>
      this._update$.next(message)
    );

    this.socket.on('disconnect', function() {
      console.log('disconnected');
    });

    this.socket.on('connect', async () => {
      this.socket.emit(SocketTypes.getAll);
    });

    this.socket.on(SocketTypes.sendAll, (data: Control[]) => {
      this._loaded$.next(data);
    });
  }

  toggle(update: ControlUpdate) {
    this.socket.emit(SocketTypes.toggle, update);
  }

  startQuickAction() {
    this.socket.emit(SocketTypes.startQuickAction);
  }
}
