import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {path:"products",component:ProductComponent},
  {path:"customers",component:CustomersComponent},
  {path:"orders/:customerId",component:OrdersComponent},
  {path:"order-details/:orderId",component:OrderDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
