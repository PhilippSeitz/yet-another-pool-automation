import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentTemperature } from '@pool/data';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  constructor(private http: HttpClient) {}

  getLast24h() {
    return this.http.get('/api/temperature/now');
  }

  getCurrentTemperature() {
    return this.http.get<CurrentTemperature[]>('/api/temperature/now');
  }
}
