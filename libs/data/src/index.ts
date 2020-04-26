export * from './lib/control.interface';
export * from './lib/control-update.interface';
export * from './lib/temperature.interface';

export enum SocketTypes {
  startQuickAction = 'startQuickAction',
  toggle = 'toggle',
  update = 'update',
  getAll = 'getAll',
  sendAll = 'sendAll'
}
