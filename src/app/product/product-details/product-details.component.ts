import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';
import { ProductSizes } from '../mock/product-sizes.mock'
import { CustomerService } from 'src/app/services/customer.service';
import { CartItem } from 'src/app/cart/models/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {

  private routeSub?: Subscription;
  public product?: Product;
  public loading: boolean = true;
  sizes = ProductSizes;
  quantity: number = 1;
  selectedSize: string = 'UK 3.5';

  get isWishlisted(): boolean {
    return this._customerService.customer.wishlistItems.indexOf(this.product?.id as string) !== -1;
  }

  constructor(private route: ActivatedRoute, private _productService: ProductService, public _customerService: CustomerService) {}

  ngOnInit(): void {
    this.loading = true;
    this.routeSub = this.route.params.subscribe((params) => {
      this._productService.getProductById(params['id']).subscribe((product) => {
        this.product = product;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      })
    });
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }

  public addToCart(productId: string) {
    const cartItem = new CartItem(productId, this.selectedSize, this.quantity);
    this._customerService.addToCart(cartItem);
  }

  public validateInput() {
    if (isNaN(this.quantity) || this.quantity < 0 || this.quantity > 5) {
      this.quantity = 1;
    }
  }
}
