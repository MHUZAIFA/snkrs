import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { CartItem } from '../cart/models/cart-item';
import { Customer } from '../models/Customer';
import { CustomerDetails } from '../models/Customer-Details';
import { OrderStatusEnum } from '../order/enums/OrderStatus';
import { OrderItem } from '../order/models/Order';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private _customer = new BehaviorSubject(new Customer());

  get customer$(): Observable<Customer> {
    return this._customer.asObservable();
  }

  get customer(): Customer {
    return this._customer.getValue();
  }

  constructor(
    private _authService: AuthService,
    private _utilityService: UtilitiesService,
    private _snackBar: MatSnackBar
  ) {
    if (!localStorage.getItem('customers')) {
      localStorage.setItem('customers', JSON.stringify([] as Customer[]));
    }

    this._authService.loggedInUser$.subscribe((user) =>
      this.InitializeCustomer(user.email)
    );
  }

  public wishlistToggle(id: string) {
    const c_customer = { ...this.customer };
    if (this._authService.isLoggedIn) {
      const index = this.customer.wishlistItems.indexOf(id);
      if (index === -1) {
        c_customer.wishlistItems.push(id);
        this._snackBar.open('Added to wishlist', 'dismiss', { duration: 2000 });
      } else {
        c_customer.wishlistItems.splice(index, 1);
        this._snackBar.open('Removed from wishlist', 'dismiss', {
          duration: 2000,
        });
      }
      this.updateCustomer(c_customer);
    } else {
      this._authService.askToLogin();
    }
  }

  public addToCart(cartItem: CartItem) {
    const c_customer = { ...this.customer };
    if (this._authService.isLoggedIn) {
      c_customer.cartItems.push(cartItem);
      this.updateCustomer(c_customer);
      this._snackBar.open('Added to cart', 'dismiss', { duration: 2000 });
    } else {
      this._authService.askToLogin();
    }
  }

  public removeFromCart(cartItem: CartItem) {
    if (this._authService.isLoggedIn) {
      const c_customer = { ...this.customer };
      const index = this.customer.cartItems.findIndex(
        (c) => c.productId === cartItem.productId
      );
      c_customer.cartItems.splice(index, 1);
      this.updateCustomer(c_customer);
      this._snackBar.open('Removed from cart', 'dismiss', { duration: 2000 });
    } else {
      this._authService.askToLogin();
    }
  }

  public updateCartItem(cartItem: CartItem) {
    const c_customer = { ...this.customer };
    if (this._authService.isLoggedIn) {
      const index = this.customer.cartItems.findIndex(c => c.productId === cartItem.productId);
      c_customer.cartItems.splice(index, 1);
      c_customer.cartItems.push(cartItem);
      this.updateCustomer(c_customer);
      this._snackBar.open('Cart item updated', 'dismiss', { duration: 2000 });
    } else {
      this._authService.askToLogin();
    }
  }

  public moveToWishlist(cartItem: CartItem) {
    const productId = cartItem.productId;
    const c_customer = { ...this.customer };
    if (this._authService.isLoggedIn) {
      const index = this.customer.wishlistItems.indexOf(productId);
      if (index === -1) {
        c_customer.wishlistItems.push(productId);
      }
      this.removeFromCart(cartItem);
      this.updateCustomer(c_customer);
      this._snackBar.open('Moved to wishlist', 'dismiss', { duration: 2000 });
    } else {
      this._authService.askToLogin();
    }
  }

  public createOrder(customerDetails: CustomerDetails, netTotal: string) {
    let orders = [] as OrderItem[];
    if (!localStorage.getItem('orders')) {
      orders = [] as OrderItem[];
    } else {
      orders = JSON.parse(
        localStorage.getItem('orders') as string
      ) as OrderItem[];
    }
    const id = this._utilityService.generateUUID();
    const trackingId = `T${orders.length}`;
    const statuses = Object.values(OrderStatusEnum);
    const order = new OrderItem(
      id,
      trackingId,
      this.customer.cartItems,
      netTotal,
      statuses[this._utilityService.randomInteger(0,2)],
      new Date().toString(),
      customerDetails
    );

    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    this.customer.cartItems = [] as CartItem[];
    this.customer.orders.push(id);
    this.updateCustomer(this.customer);
    this._snackBar.open('Order placed', 'dismiss', { duration: 2000 });
  }

  private InitializeCustomer(email: string) {
    if (this._authService.isLoggedIn) {
      const stream = localStorage.getItem('customers');
      if (stream) {
        const customers = JSON.parse(stream) as Customer[];
        const index = customers.findIndex((c) => c.emailId === email);

        if (index === -1) {
          const customer = new Customer();
          // customer does not already exist
          customer.emailId = email;
          this.updateCustomer(customer);
        } else {
          // customer exists, set customer obj
          this._customer.next({
            ...(customers.find((c) => c.emailId === email) as Customer),
          });
        }
      }
    } else {
      this._customer.next(new Customer());
    }
  }

  private updateCustomer(customerToUpdate: Customer) {
    const stream = localStorage.getItem('customers') as string;
    const customers = JSON.parse(stream) as Customer[];
    const index = customers.findIndex(
      (c) => c.emailId === customerToUpdate.emailId
    );
    if (index !== -1) {
      customers.splice(index, 1);
      customers.push(customerToUpdate);
    } else {
      customers.push(customerToUpdate);
    }
    localStorage.setItem('customers', JSON.stringify(customers));
    this._customer.next(customerToUpdate);
  }
}
