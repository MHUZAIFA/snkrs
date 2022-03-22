import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-unit',
  templateUrl: './rating-unit.component.html',
  styleUrls: ['./rating-unit.component.css']
})
export class RatingUnitComponent implements OnInit {

  @Input() label = 5;
  @Input() percentage = 50;
  @Input() reviewerCount = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
