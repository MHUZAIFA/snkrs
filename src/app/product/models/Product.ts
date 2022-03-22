import { Category, SubCategory } from "../enums/Category";

export class Product {
  id: string;
  name: string;
  coverImage: string;
  category: Category;
  subCategory: SubCategory;
  images: string[];
  description: string;
  displayPrice: string;
  price: number;
  newest: boolean;


  constructor(
    id: string,
    name: string,
    coverImage: string,
    category: Category,
    subCategory: SubCategory,
    images: string[],
    description: string,
    displayPrice: string,
    price: number,
    newest: boolean
  ) {
    this.id = id;
    this.name = name;
    this.coverImage = coverImage;
    this.category = category;
    this.subCategory = subCategory;
    this.images = images;
    this.description = description;
    this.displayPrice = displayPrice;
    this.price = price;
    this.newest = newest;
  }
}
