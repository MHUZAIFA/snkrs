import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CheckoutFormService {
  customerDetailsForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.customerDetailsForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      shippingMethod: ['standard', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['India', Validators.required],
      postalCode: ['', Validators.required],
      phone: ['', Validators.required],
      paymentMode: ['COD', Validators.required],
    });
  }
}
