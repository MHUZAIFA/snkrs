import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from 'src/app/cart/models/cart-item';
import { CustomerDetails } from 'src/app/models/Customer-Details';
import { PRODUCTS } from 'src/app/product/mock/products.mock';
import { Product } from 'src/app/product/models/Product';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderStatusEnum } from '../enums/OrderStatus';
import { OrderItem } from '../models/Order';
import { OrderDetailsSummary } from '../models/Order-details-summary';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private _orderDetailsSummary = new BehaviorSubject(
    new OrderDetailsSummary('', '', OrderStatusEnum.placed, 0, new CustomerDetails())
  );
  private _orderedProducts = new BehaviorSubject([] as Product[]);
  private _cartItems = new BehaviorSubject([] as CartItem[]);
  private _orders = new BehaviorSubject([] as OrderItem[]);
  private _noOrderFound: boolean = false;

  products = PRODUCTS;

  get noOrderFound(): boolean {
    return this._noOrderFound;
  }

  get orderedProducts(): Product[] {
    return this._orderedProducts.getValue();
  }

  get orderedProducts$(): Observable<Product[]> {
    return this._orderedProducts.asObservable();
  }

  get cartItems(): CartItem[] {
    return this._cartItems.getValue();
  }

  get cartItems$(): Observable<CartItem[]> {
    return this._cartItems.asObservable();
  }

  get orders(): OrderItem[] {
    return this._orders.getValue();
  }

  get orders$(): Observable<OrderItem[]> {
    return this._orders.asObservable();
  }

  get orderDetailsSummary(): OrderDetailsSummary {
    return this._orderDetailsSummary.getValue();
  }

  constructor(private _customerService: CustomerService) {
    if (!localStorage.getItem('orders')) {
      localStorage.setItem('orders', JSON.stringify([]));
    }
  }

  public getOrders() {
    const orders = JSON.parse(
      localStorage.getItem('orders') as string
    ) as OrderItem[];
    const customerOrders = orders.filter((o) =>
      this._customerService.customer.orders.includes(o.id)
    );
    this._orders.next(customerOrders);
  }

  public getOrderDetails(orderId: string) {
    this._noOrderFound = false;

    const orders = JSON.parse(
      localStorage.getItem('orders') as string
    ) as OrderItem[];
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      const orderedProductIds = order.cartItems.map((i) => i.productId);
      const products = this.products.filter((p) =>
        orderedProductIds.includes(p.id)
      );
      this._orderedProducts.next(products);
      this._cartItems.next(order.cartItems);
      this._orderDetailsSummary.next(
        new OrderDetailsSummary(
          order.trackingId,
          order.netTotal,
          order.status,
          order.cartItems.length,
          order.customerDetails
        )
      );
    } else {
      this._noOrderFound = true;
      this._cartItems.next([]);
      this._orderedProducts.next([]);
    }
  }
}
