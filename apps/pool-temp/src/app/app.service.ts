import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';
import * as mqtt from 'mqtt';

const client = mqtt.connect('mqtt://mqtt:1883', {
  clean: false,
  clientId: 'tempSender'
});

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
        'temp',
        `temp,location=${name} value=${temp} ${Date.now()}000000`,
        { qos: 1 }
      );
    } else {
      this.logger.error(`status not YES - ${name}`);
    }
  }

  private readSlaveFile(name: string) {
    if (!name) {
      return;
    }
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

  @Cron('*/30 * * * * *')
  async getTemp() {
    this.findSlaves();
  }
}
