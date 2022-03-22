import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderedProductCardComponent } from './components/ordered-product-card/ordered-product-card.component';



@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailsComponent,
    OrderedProductCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class OrderModule { }
