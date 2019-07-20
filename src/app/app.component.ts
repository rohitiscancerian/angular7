import { Component } from '@angular/core';
import * as Msal from 'msal';
import { MsalService } from './service/msal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers : [MsalService]
})
export class AppComponent {
  title = 'b2c-basic-app';

  constructor(private msalService: MsalService) {

  }

  useremail() {
    const useremail = this.msalService.getUserEmail();
    return useremail;
  }

  login(){
    this.msalService.login();
  }

  signup(){
    this.msalService.signup();
  }

  logout(){
    this.msalService.logout();
  }

  isUserLoggedIn(){
    return this.msalService.isLoggedIn();
  }

}