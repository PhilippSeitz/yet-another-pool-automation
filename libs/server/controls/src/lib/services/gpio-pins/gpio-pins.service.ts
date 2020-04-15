import { Injectable, Logger, Inject } from '@nestjs/common';
import { Control, ControlUpdate } from '@pool/data';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

interface QuickAction {
  start: moment.Moment;
  duration: number;
}

@Injectable()
export class GpioPinsService {
  history = [{ date: moment('18:30', 'HH:mm'), on: true }];

  schedule = [
    { time: '08:00', on: true },
    { time: '12:04', on: false },
    { time: '12:38', on: false }
  ];

  quickAction: QuickAction;
  readonly quickActionTarget = '1';

  controlMap: Map<string, Control> = [
    { id: '1', name: 'Pumpe', on: false },
    { id: '2', name: 'Licht', on: true },
    { id: '3', name: 'Pool Licht', on: false },
    { id: '4', name: 'Gegenstromanlage', on: true }
  ].reduce((map, obj) => map.set(obj.id, obj), new Map());

  get controlUpdate$(): Observable<ControlUpdate> {
    return this._controlUpdate$;
  }

  private _controlUpdate$ = new Subject<ControlUpdate>();

  get controls() {
    return [...this.controlMap.values()];
  }

  constructor(
    private logger: Logger,
    @Inject('GPIO_SERVICE') private client: ClientProxy
  ) {
    this.logger.setContext('GpioPins');
  }
  private print() {
    this.logger.debug(
      [...this.controlMap.values()]
        .map(val => `${val.name} ${val.on ? '✅' : '🛑'}`)
        .join(' | ')
    );
  }

  update(id: string, on: boolean, userOrigin = true) {
    if (userOrigin && id === this.quickActionTarget && this.quickAction) {
      this.endQuickAction();
      return;
    }
    this.controlMap.set(id, { ...this.controlMap.get(id), on });
    this._controlUpdate$.next({ id, on });

    const light = this.controlMap.get('2');
    this.print();
    return this.client.send(light.on ? { cmd: 'on' } : { cmd: 'off' }, 9);
  }

  private f(d: moment.Moment) {
    return d.format('HH:mm');
  }

  startQuickAction(quickAction: QuickAction) {
    this.quickAction = { ...quickAction, start: moment(quickAction.start) };
    this.update(this.quickActionTarget, true, false);
    this.logger.verbose(
      `Start new Quick Action until ${this.f(
        moment(this.quickAction.start).add(this.quickAction.duration, 'minutes')
      )}`
    );
  }

  private endQuickAction() {
    this.quickAction = undefined;
    this.logger.verbose('end quick action');
    this.update(this.quickActionTarget, false, false);
  }

  @Cron('* * * * *')
  handleCron() {
    const now = moment();
    const nowKey = this.f(now);

    if (this.quickAction) {
      this.logger.verbose('quickAction found');
      const quickActionEnd = moment(this.quickAction.start).add(
        this.quickAction.duration,
        'minute'
      );
      const isQuickActionAfter = now.isSameOrAfter(quickActionEnd, 'minutes');

      if (isQuickActionAfter) {
        this.endQuickAction();
      }

      return;
    }

    this.schedule.forEach(event => {
      if (event.time === nowKey) {
        this.logger.verbose('schedule event');
        this.update(this.quickActionTarget, event.on, false);
      }
    });
  }
}
