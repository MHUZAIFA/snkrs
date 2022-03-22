import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Category, SubCategory } from '../../enums/Category';
import { ProductFilter } from '../../models/Product-Filter';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnInit {
  // priceRange;
  minValue: number = 1;
  maxValue: number = 25000;
  options: Options = {
    floor: 0,
    ceil: 25000,
    step: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> &#8377;' + value;
        case LabelType.High:
          return '<b>Max price:</b> &#8377;' + value;
        default:
          return '$' + value;
      }
    },
  };

  // forms
  gender: FormGroup = this._formBuilder.group({
    men: false,
    women: false,
    unisex: false,
  });

  kids: FormGroup = this._formBuilder.group({
    boys: false,
    girls: false,
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _bottomSheetRef: MatBottomSheetRef<ProductFilterComponent>,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this.bindFilterToForm();
  }

  applyFilter() {
    const filter = this.buildFilter();
    this._productService.filter = filter;
    this._bottomSheetRef.dismiss();
  }

  reset() {
    const filter = new ProductFilter([], [], 0, 25000);
    this._productService.filter = filter;
    this.bindFilterToForm();
  }

  cancel() {
    this._bottomSheetRef.dismiss();
  }

  private buildFilter(): ProductFilter {
    const categories = this.getSelectedCategories();
    const subCategories = this.getSelectedSubCategories();
    return new ProductFilter(
      categories,
      subCategories,
      this.minValue,
      this.maxValue
    );
  }

  private getSelectedCategories(): Category[] {
    const categories = [] as Category[];
    const gender = this.gender.getRawValue();

    if (gender.men) {
      categories.push(Category.Men);
    }
    if (gender.women) {
      categories.push(Category.Women);
    }
    if (gender.unisex) {
      categories.push(Category.Unisex);
    }

    return categories;
  }

  private getSelectedSubCategories(): SubCategory[] {
    const subCategories = [] as SubCategory[];
    const kids = this.kids.getRawValue();

    if (kids.boys) {
      subCategories.push(SubCategory.boys);
    }
    if (kids.girls) {
      subCategories.push(SubCategory.girls);
    }

    return subCategories;
  }

  private bindFilterToForm() {
    const filter = this._productService.filter;
    this.bindCategories(filter.categories);
    this.bindSubCategories(filter.subCategories);
    this.minValue = filter.minPrice;
    this.maxValue = filter.maxPrice;
  }

  private bindCategories(categories: Category[]) {
    this.updateForm(this.gender, 'men', categories.includes(Category.Men));
    this.updateForm(this.gender, 'women', categories.includes(Category.Women));
    this.updateForm(this.gender, 'unisex', categories.includes(Category.Unisex));
  }

  private bindSubCategories(subCategories: SubCategory[]) {
    this.updateForm(this.kids, 'boys', subCategories.includes(SubCategory.boys));
    this.updateForm(this.kids, 'girls', subCategories.includes(SubCategory.girls));
  }

  private updateForm(_form: FormGroup, control: string, value: boolean) {
    _form.get(control)?.setValue(value);
  }
}
