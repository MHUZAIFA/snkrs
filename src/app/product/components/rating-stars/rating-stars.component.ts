import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.css']
})
export class RatingStarsComponent implements OnInit {

  @Input() fullStars = 4;
  @Input() halfStars = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
