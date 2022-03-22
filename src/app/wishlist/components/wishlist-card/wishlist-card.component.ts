import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/product/models/Product';

@Component({
  selector: 'app-wishlist-card',
  templateUrl: './wishlist-card.component.html',
  styleUrls: ['./wishlist-card.component.css']
})
export class WishlistCardComponent implements OnInit {

  @Input() product?: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
