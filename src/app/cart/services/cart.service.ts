import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Product } from 'src/app/product/models/Product';
import { ProductService } from 'src/app/product/services/product.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _total: number = 0;
  private _subTotal: number = 0;
  private _shippingMethod = 'standard';
  private _shippingCharges = 0;

  loggedIn: boolean = false;
  cartItems: CartItem[] = [];
  products: Product[];
  deliveryCharges: number = 0;

  get shippingMethod() {
    return this._shippingMethod;
  }

  set shippingMethod(method: string) {
    this._shippingMethod = method;
    this._shippingCharges = method === 'standard' ? 0 : 250;
    this.computeSummary();
  }

  get subTotal(): string {
    return this._utilitiesService.formatTotal(this._subTotal);
  }

  get total(): string {
    return this._utilitiesService.formatTotal(this._total);
  }

  get shippingCharges() {
    return this._shippingCharges;
  }

  constructor(
    _productService: ProductService,
    _authService: AuthService,
    private _utilitiesService: UtilitiesService,
    private _customerService: CustomerService
  ) {
    this.products = _productService.products;
    _authService.isLoggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });

    _customerService.customer$.subscribe(_ => this.getSummary());
  }

  public getSummary() {
    this.cartItems = this.loggedIn ? this._customerService.customer.cartItems : [];
    this.deliveryCharges = this.cartItems.length > 0 ? 750 : 0;
    this.computeSummary();
  }

  private computeSummary() {
    this._subTotal = 0;
    this.cartItems.forEach((c) => {
      const price = this.products.find((p) => p.id === c.productId)?.price;
      if (price) {
        this._subTotal = this._subTotal + c.quantity * price;
      } else {
        const index = this.cartItems.findIndex(
          (i) => i.productId === c.productId
        );
        this.cartItems.splice(index, 1);
      }
    });

    this._total = this._subTotal + this.deliveryCharges + this._shippingCharges;
  }


}
