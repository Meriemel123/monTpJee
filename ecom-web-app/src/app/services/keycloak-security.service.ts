import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { KeycloakInstance } from 'keycloak-js';
declare var keycloak:any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakSecurityService {
   public kc!:KeycloakInstance
  constructor() { }
  logout(){
    this.kc.logout()
  }
  login(){
    this.kc.login()
  }
  isAppManager()
  {
    return this.kc.hasResourceRole("MANAGER");
  }
  toAccount(){
    this.kc.accountManagement()
  }

  async init(){
   console.log("Security initialisation ...")
   this.kc=new Keycloak({
    url:"http://localhost:8080",
    clientId:"ecom-app",
    realm:"myrealm",
  });
  await this.kc.init({
    onLoad: 'login-required',
    checkLoginIframe:false,
    })
  }

}
