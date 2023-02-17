import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakSecurityService } from '../services/keycloak-security.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers:any

  constructor(private http:HttpClient,private router:Router,private securityService:KeycloakSecurityService) { }

   getOrders(c:any)
  {
    this.router.navigateByUrl("/orders/"+c.id)
  }


  ngOnInit(): void {
    var token=this.securityService.kc.token;
    this.http.get("http://localhost:8888/CUSTOMER-SERVICE/customers",{headers:new HttpHeaders({"Authorization":"Bearer "+token})}).subscribe(
      {
        next:(data)=>{
        this.customers=data;
        },
     error:(err) =>{

     },
      }
    )
  }

}
