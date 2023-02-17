import { Component ,OnInit} from '@angular/core';
import { KeycloakSecurityService } from './services/keycloak-security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ecom-web-app';
  constructor(public securityService:KeycloakSecurityService){}
  isAppManager()
  {
    return this.securityService.isAppManager();
  }
  onLogout()
  {
    this.securityService.logout();
  }
  toAccount() {
    this.securityService.toAccount()
  }
  onLogin(){
    this.securityService.login();
  }
  ngOnInit(): void {

  }
}
