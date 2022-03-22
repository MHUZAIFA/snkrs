import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<ModalComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this._dialogRef.close();
  }

}
