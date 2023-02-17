import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { KeycloakSecurityService } from '../services/keycloak-security.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products:any

  constructor(private http:HttpClient,private securityService:KeycloakSecurityService) { }

  ngOnInit(): void {
    var token=this.securityService.kc.token;
    this.http.get("http://localhost:8888/PRODUCTS-SERVICE/products",{headers:{"Authorization":"Bearer "+token}}).subscribe(
      {
        next:(data)=>{
        this.products=data;
        },
     error:(err) =>{

     },
      }
    )
  }

}
