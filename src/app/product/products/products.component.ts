import { Component, OnInit } from '@angular/core';
import { SortBy } from '../enums/SortBy';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  get filterApplied(): boolean {
    const filter = this._productService.filter;
    return filter.categories.length > 0 || filter.subCategories.length > 0 || filter.minPrice > 0 || filter.maxPrice < 25000;
  }

  sortBy: string[] = Object.values(SortBy);
  selectedValue: string = '';

  constructor(public _productService: ProductService) {}

  ngOnInit(): void {
    this._productService.refreshProducts();
  }

}
