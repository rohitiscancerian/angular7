import { Injectable } from '@angular/core';

import * as Msal from 'msal';

declare var bootbox: "";
@Injectable()
export class MsalService {

    B2CTodoAccessTokenKey = "b2c.access.token";

    tenantConfig = {
        tenant: "GPHCDEVAADB2C.onmicrosoft.com",
        // Replace this with your client id 
        clientID: '9a95c49c-74fb-403a-8f15-b86dfd6c0caa',
        signInPolicy: "B2C_1_Auth-SignUpIn",
        signUpPolicy: "B2C_1_Auth-SignUpIn",
        redirectUri:"http://localhost:44356",
        b2cScopes:["https://gphcdevaadb2c.onmicrosoft.com/revalapi/user_impersonation", "openid" ,"offline_access"]
    };

    // Configure the authority for Azure AD B2C
    authority = "https://login.microsoftonline.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signInPolicy;

    /*
     * B2C SignIn SignUp Policy Configuration
     */
    clientApplication = new Msal.UserAgentApplication(
        this.tenantConfig.clientID, this.authority,
        function (errorDesc: any, token: any, error: any, tokenType: any) {
      }
    );

    public login():void{
      this.clientApplication.authority = "https://login.microsoftonline.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signInPolicy;
      this.authenticate();
    }

    public signup():void{
      this.clientApplication.authority = "https://login.microsoftonline.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signUpPolicy;
      this.authenticate();
    }

    public authenticate(): void {
        var _this = this;
        this.clientApplication.loginPopup(this.tenantConfig.b2cScopes).then(function (idToken: any) {
            _this.clientApplication.acquireTokenSilent(_this.tenantConfig.b2cScopes).then(
                function (accessToken: any) {
                    _this.saveAccessTokenToCache(accessToken);
                }, function (error: any) {
                    _this.clientApplication.acquireTokenPopup(_this.tenantConfig.b2cScopes).then(
                        function (accessToken: any) {
                            _this.saveAccessTokenToCache(accessToken);
                        }, function (error: any) {
                            console.log("error: ", error);
                        });
                })
        }, function (error: any) {
            console.log("error: ", error);
        });
    }

    saveAccessTokenToCache(accessToken: string): void {
        sessionStorage.setItem(this.B2CTodoAccessTokenKey, accessToken);
    };

    logout(): void {
        this.clientApplication.logout();
    };

    isLoggedIn(): boolean {
        return this.clientApplication.getUser() != null;
    };

    getUserEmail(): string{
       return this.getUser().idToken['emails'][0];
    }

    getUser(){
      return this.clientApplication.getUser()
    }
}