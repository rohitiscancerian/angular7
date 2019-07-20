import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { sharedStylesheetJitUrl } from '@angular/compiler';
import { MsalService } from '../service/msal.service';

@Component({
  selector: 'app-save-reval-entry',
  templateUrl: './fetch-data.component.html',
  styleUrls : ['./fetch-data.scss'],
  providers : [MsalService]
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, msalService: MsalService) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('b2c.access.token')
      })
    };

    http.post(baseUrl + '/v1.0/registrant/revalidation/entries', {

      dynamicFormId: '3e3066b3-ca8a-4d61-8685-4c95b4e47e93',

      gphcId: '2c43e219-8e58-e611-80e1-00505685383b',

      title: 'Title of the Unplanned CPD',

      answers: [

        {

          questionId: 'd1e61993-2829-431a-a4df-379b107f8c46',

          answer: 'This is the answer for  Describe an unplanned event or activity that enabled you to learn something new or refresh your knowledge or skills. Use the same QuestionId in the request payload as below'

        },

        {

          questionId: '5fc3448e-95a5-45e5-9661-d6cefe363b8d',

          answer: 'This is the answer for \'Give an example of how this learning benefited the people using your services\'. Use the same QuestionId in the request payload as below'

        }

      ]

    }, httpOptions

      ).subscribe();

    }



}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
