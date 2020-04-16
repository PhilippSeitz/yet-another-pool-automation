import { Injectable, Logger } from '@nestjs/common';
import { Control, ControlUpdate } from '@pool/data';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';
import { Observable, Subject, of } from 'rxjs';
import { GpioService } from '@pool/server/gpio';

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
    { id: '1', name: 'Pumpe', on: false, pin: 17 },
    { id: '2', name: 'Licht', on: false, pin: 9 },
    { id: '3', name: 'Pool Licht', on: false, pin: 10 },
    { id: '4', name: 'Gegenstromanlage', on: false, pin: 22 }
  ].reduce((map, obj) => map.set(obj.id, obj), new Map());

  get controlUpdate$(): Observable<ControlUpdate> {
    return this._controlUpdate$;
  }

  private _controlUpdate$ = new Subject<ControlUpdate>();

  get controls() {
    return [...this.controlMap.values()];
  }

  constructor(private logger: Logger, private gpio: GpioService) {
    this.logger.setContext('GpioPins');
  }

  private print() {
    this.logger.debug(
      [...this.controlMap.values()]
        .map(val => `${val.name} ${val.on ? '✅' : '🛑'}`)
        .join(' | ')
    );
  }

  getAll() {
    return of(this.controlMap);
  }

  update(id: string, on: boolean, userOrigin = true) {
    if (userOrigin && id === this.quickActionTarget && this.quickAction) {
      return this.endQuickAction();
    }
    const control = this.controlMap.get(id);
    this.controlMap.set(id, { ...control, on });
    this._controlUpdate$.next({ id, on });

    this.print();
    return on ? this.gpio.on(control.pin) : this.gpio.off(control.pin);
  }

  private f(d: moment.Moment) {
    return d.format('HH:mm');
  }

  startQuickAction(quickAction: QuickAction) {
    this.quickAction = { ...quickAction, start: moment(quickAction.start) };
    this.logger.verbose(
      `Start new Quick Action until ${this.f(
        moment(this.quickAction.start).add(this.quickAction.duration, 'minutes')
      )}`
    );
    return this.update(this.quickActionTarget, true, false);
  }

  private endQuickAction() {
    this.quickAction = undefined;
    this.logger.verbose('end quick action');
    return this.update(this.quickActionTarget, false, false);
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
