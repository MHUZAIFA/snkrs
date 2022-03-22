import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CheckoutModalComponent } from './checkout-modal/checkout-modal.component';

@Component({
  selector: 'app-checkout-modal-wrapper',
  template: ``,
  styles: [
  ]
})
export class CheckoutModalWrapperComponent implements OnInit {

  subscription?: Subscription;

  constructor(public dialog: MatDialog, private _router: Router) {}

  ngOnInit(): void {
      this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CheckoutModalComponent, { disableClose: true });

    this.subscription = dialogRef.afterClosed().subscribe(_ => {
      const redirectUri = this._router.url.replace('/(modal:checkout)', '');
      this._router.navigateByUrl(redirectUri);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
