import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-modal-wrapper',
  template: ``,
  styles: [],
})
export class ModalWrapperComponent implements OnInit {
  subscription?: Subscription;

  constructor(public dialog: MatDialog, private _router: Router) {}

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      disableClose: true,
      panelClass: 'custom_modal',
    });

    this.subscription = dialogRef.afterClosed().subscribe((_) => {
      const redirectUri = this._router.url.replace('(modal:authenticate)', '');
      this._router.navigateByUrl(redirectUri);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
