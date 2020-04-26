import { Injectable } from '@nestjs/common';
import { InfluxDB, FieldType } from 'influx';

const influx = new InfluxDB({
  host: 'pool-master',
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
      round(mean("value") / 1000 * 10)/10 as "meanValue"
    FROM "autogen"."temp"
    WHERE
      AND time >= now() - 24h
    GROUP BY 
       time(5m),
       location 
    Fill(null)
  `);
  }

  getCurrentTemperature() {
    return influx.query(`
    SELECT 
      round(mean("value") / 1000 * 10)/10 as "meanValue",
      count(value) as "dataPoints",
      round(min(value) / 1000 * 10)/10 as "min",
      round(max(value) / 1000 * 10)/10 as "max" 
    FROM "autogen"."temp"
    WHERE time >= now() - 2m
    GROUP BY location
    Fill(null)
  `);
  }
}
