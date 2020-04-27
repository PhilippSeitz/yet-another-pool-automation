import { Injectable } from '@nestjs/common';
import { InfluxDB, FieldType } from 'influx';
import { environment } from '../environments/environment';

const influx = new InfluxDB({
  host: environment.production ? 'influxdb' : 'pool-master',
  database: 'telegraf',
  schema: [
    {
      measurement: 'temp',
      fields: {
        value: FieldType.INTEGER
      },
      tags: ['location']
    }
  ]
});

@Injectable()
export class AppService {
  getLast24h() {
    return influx.query(`
    SELECT 
      round(mean("value") / 1000 * 10)/10 as "value"
    FROM "autogen"."temp"
    WHERE
     time >= now() - 24h
    GROUP BY 
       time(5m),
       location 
    Fill(null)
  `);
  }

  getMinMax24() {
    return this.getSnapShot('24h');
  }

  getCurrentTemperature() {
    return this.getSnapShot();
  }

  getSnapShot(time = '2m') {
    return influx.query(`
    SELECT 
      round(mean("value") / 1000 * 10)/10 as "meanValue",
      count(value) as "dataPoints",
      round(min(value) / 1000 * 10)/10 as "min",
      round(max(value) / 1000 * 10)/10 as "max" 
    FROM "autogen"."temp"
    WHERE time >= now() - ${time}
    GROUP BY location
    Fill(null)
  `);
  }
}
