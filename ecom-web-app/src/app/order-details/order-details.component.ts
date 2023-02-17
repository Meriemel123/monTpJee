import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakSecurityService } from '../services/keycloak-security.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderDetails:any
  orderId!:number
  constructor(private http:HttpClient,private router:Router, private route:ActivatedRoute,private securityService:KeycloakSecurityService) {
    this.orderId=this.route.snapshot.params.orderId
  }


  ngOnInit(): void {
    var token=this.securityService.kc.token;
    this.http.get("http://localhost:8888/BILLING-SERVICE/fullBill/"+this.orderId,{headers:new HttpHeaders({"Authorization":"Bearer "+token})}).subscribe(
      {
        next:(data)=>{
        this.orderDetails=data;
        },
     error:(err) =>{

     },
      }
    )
  }
}
