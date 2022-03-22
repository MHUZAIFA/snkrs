import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/app/cart/services/cart.service';
import { CustomerDetails } from 'src/app/models/Customer-Details';
import { CustomerService } from 'src/app/services/customer.service';
import { CheckoutFormService } from '../../services/checkout-form.service';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.css'],
})
export class CheckoutModalComponent implements OnInit {

  private _orderPlaced = false;

  get isStandardShipping(): boolean {
    return this._formService.customerDetailsForm.get('shippingMethod')?.value === 'standard';
  }

  get submitButtonText(): string {
    return this._formService.customerDetailsForm.get('paymentMode')?.value === 'COD' ? 'Place Order' : `Pay ${this._cartService.total} securely`;
  }

  get orderPlaced(): boolean {
    return this._orderPlaced;
  }

  get noCartItems(): boolean {
    return this._customerService.customer.cartItems.length === 0 && !this.orderPlaced;
  }

  shippingMethod: string = 'standard';

  constructor(
    public _formService: CheckoutFormService,
    public _cartService: CartService,
    private _customerService: CustomerService,
    private _dialogRef: MatDialogRef<CheckoutModalComponent>
  ) {}

  ngOnInit(): void {
      this._orderPlaced = false;
  }

  public updateShippingMethod(method: string) {
    this._formService.customerDetailsForm.get('shippingMethod')?.setValue(method);
    this._cartService.shippingMethod = method;
  }

  public placeOrder() {
    const customerDetails = Object.assign({}, this._formService.customerDetailsForm.getRawValue()) as CustomerDetails;
    console.log(customerDetails);
    this._customerService.createOrder(customerDetails, this._cartService.total);
    this._orderPlaced = true;
  }

  public close() {
    this._dialogRef.close();
  }
}
