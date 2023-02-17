import { NgModule,APP_INITIALIZER} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { KeycloakSecurityService } from './services/keycloak-security.service';

function kcFactory(kcSecurity: KeycloakSecurityService){
return ()=>{kcSecurity.init();}
}

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CustomersComponent,
    OrdersComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{provide: APP_INITIALIZER,deps:[KeycloakSecurityService],useFactory:kcFactory,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
