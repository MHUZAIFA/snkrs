import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutModalWrapperComponent } from './checkout-modal-wrapper/checkout-modal-wrapper.component';
import { CheckoutModalComponent } from './checkout-modal-wrapper/checkout-modal/checkout-modal.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerInfoFormComponent } from './forms/customer-info-form/customer-info-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CheckoutModalWrapperComponent,
    CheckoutModalComponent,
    CustomerInfoFormComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
})
export class CheckoutModule {}
