import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TemperatureData, TemperatureSnapshot } from '@pool/data';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  constructor(private http: HttpClient) {}

  getLast24h() {
    return this.http.get<TemperatureData[]>('/api/temperature');
  }

  getCurrentTemperature() {
    return this.http.get<TemperatureSnapshot[]>('/api/temperature/now');
  }

  getLast24hMinMaxMean() {
    return this.http.get<TemperatureSnapshot[]>('/api/temperature/24h');
  }
}
