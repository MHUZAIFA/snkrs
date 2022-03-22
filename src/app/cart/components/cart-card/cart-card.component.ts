import { Component, Input, OnInit } from '@angular/core';
import { ProductSizes } from 'src/app/product/mock/product-sizes.mock';
import { Product } from 'src/app/product/models/Product';
import { ProductService } from 'src/app/product/services/product.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.css']
})
export class CartCardComponent implements OnInit {

  @Input() cartItem: CartItem = new CartItem('', '', 0);
  @Input() isLast: boolean = false;

  private _price = 0;

  product?: Product;
  sizes = ProductSizes;
  quantities = [1, 2, 3, 4, 5];
  selectedQuantity: number = 1;
  selectedSize: string = 'none';

  get price(): string {
    return this._utilitiesService.formatTotal(this._price);
  }

  constructor(private _productService: ProductService, public _customerService: CustomerService, private _utilitiesService: UtilitiesService) { }

  ngOnInit(): void {
    this._productService.getProductById(this.cartItem.productId).subscribe(p => {
      this.product = p;
      this.selectedQuantity = this.cartItem.quantity;
      this.selectedSize = this.cartItem.size;
      if (p) {
        this._price = this.selectedQuantity*p.price;
      }
    });
  }

  updateSize() {
    this.cartItem.size = this.selectedSize;
    this._customerService.updateCartItem(this.cartItem);
  }

  updateQuantity() {
    this.cartItem.quantity = this.selectedQuantity;
    this._customerService.updateCartItem(this.cartItem);
  }

  public validateInput() {
    if (isNaN(this.selectedQuantity) || this.selectedQuantity < 0 || this.selectedQuantity > 5) {
      this.selectedQuantity = 1;
    }
  }

}
