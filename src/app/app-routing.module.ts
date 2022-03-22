import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessoriesComponent } from './accessories/accessories/accessories.component';
import { ModalWrapperComponent } from './auth/modal-wrapper/modal-wrapper.component';
import { CartComponent } from './cart/cart/cart.component';
import { CheckoutModalWrapperComponent } from './checkout/checkout-modal-wrapper/checkout-modal-wrapper.component';
import { HomeComponent } from './home/home/home.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { OrdersComponent } from './order/orders/orders.component';
import { FilterWrapperComponent } from './product/filter-wrapper/filter-wrapper.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductsComponent } from './product/products/products.component';
import { WishlistComponent } from './wishlist/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'explore', pathMatch: 'full' },
  {
    path: 'authenticate',
    component: ModalWrapperComponent,
    outlet: 'modal',
  },
  { path: 'explore', component: HomeComponent },
  {
    path: 'sneakers',
    children: [
      {
        path: '',
        component: ProductsComponent,
        children: [
          {
            path: 'filter',
            component: FilterWrapperComponent,
            outlet: 'bottomsheet',
          },
        ],
      },
      { path: ':id', component: ProductDetailsComponent },
    ],
  },
  { path: 'accessories', component: AccessoriesComponent },
  { path: 'wishlist', component: WishlistComponent },
  {
    path: 'cart',
    component: CartComponent,
    children: [
      {
        path: 'checkout',
        component: CheckoutModalWrapperComponent,
        outlet: 'modal',
      },
    ],
  },
  {
    path: 'orders',
    component: OrdersComponent,
    children: [
      { path: ':id', component: OrderDetailsComponent, outlet: 'section' },
    ],
  },
  { path: '**', redirectTo: 'explore', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
