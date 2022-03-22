import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product/models/Product';
import { ProductService } from 'src/app/product/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  trendingProducts: Product[];

  constructor(_productService: ProductService) {
    const trending = ['46d998ea-8c13-445f-bdf2-1453d0d3b5ec', '74cceadf-1a79-48f5-ba46-83b66d177227', '4e4fd6a6-31ff-4820-bd91-fc5e7939c39f'];
    this.trendingProducts = _productService.products.filter(p => trending.includes(p.id));
  }

  ngOnInit(): void {
  }

}
