import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sharedStylesheetJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-save-reval-entry',
  templateUrl: './fetch-data.component.html',
  styleUrls : ['./fetch-data.scss']
  
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    // http.get<WeatherForecast[]>(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
    //   this.forecasts = result;
    // }, error => console.error(error));
    
  }

  

}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
