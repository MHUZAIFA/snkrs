import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { RouterModule } from '@angular/router';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FilterWrapperComponent } from './filter-wrapper/filter-wrapper.component';
import { RatingUnitComponent } from './components/rating-unit/rating-unit.component';
import { RatingStarsComponent } from './components/rating-stars/rating-stars.component';
import { ReviewComponent } from './components/review/review.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailsComponent,
    ProductCardComponent,
    ProductFilterComponent,
    FilterWrapperComponent,
    RatingUnitComponent,
    RatingStarsComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule
  ]
})
export class ProductModule { }
