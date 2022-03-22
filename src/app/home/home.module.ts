import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { LatestCardComponent } from './components/latest-card/latest-card.component';
import { ProductCarouselComponent } from './components/product-carousel/product-carousel.component';



@NgModule({
  declarations: [
    HomeComponent,
    LatestCardComponent,
    ProductCarouselComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class HomeModule { }
