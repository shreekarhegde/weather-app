import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_KEY: string = 'c121d66a5aa962cf73fe622e6259a1e7';
const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}&q=`;
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get(location: string): Observable<object> {
    return this.http.get(url + location);
  }
}
