import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SortBy } from '../enums/SortBy';
import { PRODUCTS } from '../mock/products.mock';
import { Product } from '../models/Product';
import { ProductFilter } from '../models/Product-Filter';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _products = new BehaviorSubject([] as Product[]);
  private _searchTerm = new BehaviorSubject('');
  private _filter = new BehaviorSubject(new ProductFilter([], [], 0, 25000));
  private _sortBy = new BehaviorSubject(SortBy.Default);
  private _loading = new BehaviorSubject(true);
  private _searchLoading = new BehaviorSubject(false);
  private _noProductsFound = new BehaviorSubject(false);

  get products(): Product[] {
    return this._products.getValue();
  }

  get products$(): Observable<Product[]> {
    return this._products.asObservable();
  }
  get searchTerm$(): Observable<string> {
    return this._searchTerm.asObservable();
  }
  get filter$(): Observable<ProductFilter> {
    return this._filter.asObservable();
  }
  get sortBy$(): Observable<SortBy> {
    return this._sortBy.asObservable();
  }

  set searchTerm(searchTerm: string) {
    this._searchLoading.next(true);
    this._searchTerm.next(searchTerm.toLowerCase());
  }
  get searchTerm(): string {
    return this._searchTerm.getValue();
  }

  set filter(filter: ProductFilter) {
    this._filter.next(filter);
  }
  get filter(): ProductFilter {
    return this._filter.getValue();
  }

  set sortBy(sortBy: SortBy) {
    this._sortBy.next(sortBy);
  }
  get sortBy(): SortBy {
    return this._sortBy.getValue();
  }

  get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  get noProductsFound$(): Observable<boolean> {
    return this._noProductsFound.asObservable();
  }

  constructor() {
    this.Initialize();
  }

  public refreshProducts(): void {
    this._loading.next(true);
    this.refineList();
    setTimeout(() => {
      this._loading.next(false);
    }, 1000);
  }

  public getProductById(id: string): Observable<Product | undefined> {
    const products = this.readProductsFromLocalStorage();
    const product = products.find((p) => p.id === id);
    return of(product);
  }

  private refineList() {
    let products = this.readProductsFromLocalStorage();

    // search
    products = products.filter((p) => p.name.toLowerCase().includes(this.searchTerm));

    //filter
    products = products.filter(
      (p) =>
        (this.filter.categories.length === 0 || this.filter.categories.includes(p.category)) &&
        (this.filter.subCategories.length === 0 || this.filter.subCategories.includes(p.subCategory)) &&
        ((this.filter.minPrice === 0 && this.filter.maxPrice === 0) ||
          (p.price > this.filter.minPrice && p.price < this.filter.maxPrice))
    );

    // sort
      products = this.sortProducts(products);

    // pagination


    // set results
    this._products.next(products);
    this._searchLoading.next(false);
    this._noProductsFound.next(!this._searchLoading.getValue() && this._products.getValue().length === 0);
  }

  private Initialize() {
    // Initialize Products
    const products = this.readProductsFromLocalStorage();
    // if (!products) {
      const stream = JSON.stringify(PRODUCTS);
      localStorage.setItem('products', stream);
    // }

    // Initialize Subscriptions
    this.searchTerm$.subscribe((_) => this.refineList());
    this.filter$.subscribe((_) => this.refineList());
    this.sortBy$.subscribe((_) => this.refineList());
    setTimeout(() => {
      this._loading.next(false);
  }, 1000);
  }

  private readProductsFromLocalStorage(): Product[] {
    return JSON.parse(localStorage.getItem('products') as string) as Product[];
  }

  private sortProducts(products: Product[]): Product[] {
    let sortedProducts = [] as Product[];

    switch(this.sortBy) {
      case SortBy.Default:
        sortedProducts = products;
        break;

      case SortBy.Newest:
        sortedProducts = products.sort((a, b) => (a.newest === b.newest)? 0 : a.newest ? -1 : 1);
        break;

      case SortBy.PriceLowToHigh:
        sortedProducts = products.sort((a, b) => a.price - b.price);
        break;

      case SortBy.PriceHighToLow:
        sortedProducts = products.sort((a, b) => b.price - a.price);
        break;

      default:
        sortedProducts = products;
    }

    return sortedProducts;
  }
}
