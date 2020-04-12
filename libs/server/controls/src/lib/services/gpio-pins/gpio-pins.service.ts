import { Injectable, Logger } from '@nestjs/common';
import { Control, ControlUpdate } from '@pool/data';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';

interface QuickAction {
  start: moment.Moment;
  duration: number;
}

@Injectable()
export class GpioPinsService {
  history = [{ date: moment('18:30', 'HH:mm'), on: true }];

  schedule = [
    { time: '08:00', on: true },
    { time: '17:00', on: true }
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

  constructor(private logger: Logger) {
    this.logger.setContext('GpioPins');
  }
  private print() {
    this.logger.debug(
      [...this.controlMap.values()]
        .map(val => `${val.name} ${val.on ? '✅' : '🛑'}`)
        .join(' | ')
    );
  }

  update(id: string, on: boolean) {
    this.controlMap.set(id, { ...this.controlMap.get(id), on });
    this._controlUpdate$.next({ id, on });
    this.print();
  }

  private f(d: moment.Moment) {
    return d.format('HH:mm');
  }

  startQuickAction(quickAction: QuickAction) {
    this.quickAction = { ...quickAction, start: moment(quickAction.start) };
    this.update(this.quickActionTarget, true);
    this.logger.verbose(
      `Start new Quick Action until ${this.f(
        moment(this.quickAction.start).add(this.quickAction.duration, 'minutes')
      )}`
    );
  }

  private endQuickAction() {
    this.quickAction = undefined;
    this.logger.verbose('end quick action');
    this.update(this.quickActionTarget, false);
  }

  // Called every minute * * * * *
  @Cron('*/5 * * * * *')
  handleCron() {
    const now = moment();

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
    }
  }
}
