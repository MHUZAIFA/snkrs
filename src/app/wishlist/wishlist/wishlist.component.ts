import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Product } from 'src/app/product/models/Product';
import { ProductService } from 'src/app/product/services/product.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist: Product[] = [];

  constructor(private _productService: ProductService, public _authService: AuthService, private _customerService: CustomerService) { }

  ngOnInit(): void {
    const wishlistIds = this._customerService.customer.wishlistItems;
    this.wishlist = this._productService.products.filter(p => wishlistIds.includes(p.id));
  }

}
