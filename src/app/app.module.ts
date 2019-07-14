import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { MsalModule, MsalGuard, MsalInterceptor, MsalService } from '@azure/msal-angular';
import { LogLevel } from 'msal';
import { AppBootstrapModule } from './Bootstrap/app-bootstrap.module';

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log(message);
}

export const protectedResourceMap: [string, string[]][] =
 [["https://webapp-t1dev-revalapi-6eb6.azurewebsites.net", ["https://letsbuildit.onmicrosoft.com/demoapi/demo.read"]]];


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppBootstrapModule,
    MsalModule.forRoot({
      authority: "https://login.microsoftonline.com/tfp/GPHCDEVAADB2C.onmicrosoft.com/B2C_1_Auth-SignUpIn",
      consentScopes: ["https://gphcdevaadb2c.onmicrosoft.com/revalapi/user_impersonation", "openid" ,"offline_access"],
      clientID: "9a95c49c-74fb-403a-8f15-b86dfd6c0caa",
      popUp: true,
      protectedResourceMap: protectedResourceMap,
      postLogoutRedirectUri: "https://localhost:44356/",
      logger: loggerCallback,
      level: LogLevel.Verbose
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent, canActivate: [MsalGuard] },
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
