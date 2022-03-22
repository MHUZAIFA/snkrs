import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/product/models/Product';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-latest-card',
  templateUrl: './latest-card.component.html',
  styleUrls: ['./latest-card.component.css']
})
export class LatestCardComponent implements OnInit {

  @Input() product?: Product;
  get isWishlisted(): boolean {
    return this._customerService.customer.wishlistItems.indexOf(this.product?.id as string) !== -1;
  }

  constructor(public _customerService: CustomerService) { }

  ngOnInit(): void {
  }

}
