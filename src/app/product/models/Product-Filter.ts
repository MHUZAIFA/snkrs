import { Category, SubCategory } from '../enums/Category';

export class ProductFilter {
  categories: Category[];
  subCategories: SubCategory[];
  minPrice: number;
  maxPrice: number;

  constructor(categories: Category[], subCategories: SubCategory[], minPrice: number, maxPrice: number) {
    this.categories = categories;
    this.subCategories = subCategories;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
  }
}
