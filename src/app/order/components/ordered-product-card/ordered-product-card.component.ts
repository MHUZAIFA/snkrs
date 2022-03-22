import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/cart/models/cart-item';
import { ProductSizes } from 'src/app/product/mock/product-sizes.mock';
import { Product } from 'src/app/product/models/Product';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-ordered-product-card',
  templateUrl: './ordered-product-card.component.html',
  styleUrls: ['./ordered-product-card.component.css'],
})
export class OrderedProductCardComponent implements OnInit {
  @Input() cartItem: CartItem = new CartItem('', '', 0);
  @Input() isLast: boolean = false;

  private _price = 0;

  product?: Product;
  sizes = ProductSizes;
  quantities = [1, 2, 3, 4, 5];
  selectedQuantity: number = 1;
  selectedSize: string = 'none';

  get price(): string {
    return this._utilitiesServices.formatTotal(this._price);
  }

  constructor(private _orderService: OrderService, private _utilitiesServices: UtilitiesService) {}

  ngOnInit(): void {
    this.product = this._orderService.orderedProducts.find(
      (o) => o.id === this.cartItem.productId
    );
    if (this.product) {
      this.selectedQuantity = this.cartItem.quantity;
      this.selectedSize = this.cartItem.size;
      this._price = this.selectedQuantity * this.product.price;
    }
  }
}
