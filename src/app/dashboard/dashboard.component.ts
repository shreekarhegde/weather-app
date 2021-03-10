import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../shared';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  location: string = '';
  temperature: string = '';
  errMsg: string = '';
  loading: boolean = false;
  haze: boolean = false;
  sunny: boolean = false;
  rainy: boolean = false;
  snow: boolean = false;
  constructor(private http: HttpService) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    if (!f.value.location) {
      return;
    }
    this.location = f.value.location;
    this.loading = true;
    this.http.get(f.value.location).subscribe(
      (weatherResp: Response | any) => {
        console.log('weatherResp: onSubmit--->', weatherResp);
        this.loading = false;
        this.errMsg = '';
        this.sunny = false;
        this.snow = false;
        this.haze = false;
        this.rainy = false;
        this.temperature = weatherResp.main.temp.toString();
        switch (true) {
          case parseInt(this.temperature) > 20:
            this.sunny = true;
            break;
          case parseInt(this.temperature) > 10 &&
            parseInt(this.temperature) < 20:
            this.haze = true;
            break;
          case parseInt(this.temperature) < 10 &&
            parseInt(this.temperature) > 0:
            this.rainy = true;
            break;
          case parseInt(this.temperature) < 0:
            this.snow = true;
            break;
        }
      },
      (err) => {
        this.temperature = '';
        this.loading = false;
        this.errMsg = 'Sorry! No information found.';
        console.log('err: onSubmit--->', err);
      }
    );
  }
}
