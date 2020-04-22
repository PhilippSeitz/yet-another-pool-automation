import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';
import * as mqtt from 'mqtt';

const client = mqtt.connect('mqtt://mqtt:1883');

@Injectable()
export class AppService {
  constructor(private logger: Logger) {
    this.logger.setContext('temp');
  }

  private readAndSendSlaveData(name: string, data: string) {
    const match = data.match(/t=(-?\d+)/);
    this.logger.debug(name);
    if (data.indexOf('YES') !== -1 && match) {
      const temp = match[1];
      this.logger.debug(temp);
      client.publish(
        'gpio',
        `gpio,location=${name} id=12,value=${temp} ${Date.now()}000000`
      );
    } else {
      this.logger.error(`status not YES - ${name}`);
    }
  }

  private readSlaveFile(name: string) {
    fs.readFile(
      `/sys/bus/w1/devices/${name}/w1_slave`,
      { encoding: 'utf-8' },
      (err, data) => {
        if (err) {
          this.logger.error(err);
          return;
        }

        this.readAndSendSlaveData(name, data);
      }
    );
  }

  private findSlaves() {
    fs.readFile(
      '/sys/bus/w1/devices/w1_bus_master1/w1_master_slaves',
      { encoding: 'utf-8' },
      (err, data) => {
        if (err) {
          this.logger.error(err);
          return;
        }

        data.split('\n').forEach(val => {
          this.readSlaveFile(val);
        });
      }
    );
  }

  @Cron('*/5 * * * * *')
  async getTemp() {
    this.findSlaves();
  }
}
