import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakSecurityService } from '../services/keycloak-security.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:any
  customerId!:number
  constructor(private http:HttpClient,private router:Router, private route:ActivatedRoute,private securityService:KeycloakSecurityService) {
    this.customerId=this.route.snapshot.params.customerId
  }

  getDetails(o:any){
      this.router.navigateByUrl("order-details/"+o.id)
  }

  ngOnInit(): void {
    var token=this.securityService.kc.token;
    this.http.get("http://localhost:8888/BILLING-SERVICE/fullBill/search/"+this.customerId,{headers:new HttpHeaders({"Authorization":"Bearer "+token})}).subscribe(
      {
        next:(data)=>{
          console.log(data)
        this.orders=data;
        },
     error:(err) =>{

     },
      }
    )
  }

}
