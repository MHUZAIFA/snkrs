import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetConfig,
} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductFilterComponent } from '../components/product-filter/product-filter.component';

@Component({
  selector: 'app-filter-wrapper',
  template: ``,
  styles: [],
})
export class FilterWrapperComponent implements OnInit, OnDestroy {
  subscription?: Subscription;

  constructor(private _bottomSheet: MatBottomSheet, private _router: Router) {}

  ngOnInit(): void {
    const config: MatBottomSheetConfig = {
      disableClose: true,
    };
    const sheet = this._bottomSheet.open(ProductFilterComponent, config);
    this.subscription = sheet.afterDismissed().subscribe(() => {
      const redirectUri = this._router.url.replace('/(bottomsheet:filter)', '');
      this._router.navigate([redirectUri]);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
