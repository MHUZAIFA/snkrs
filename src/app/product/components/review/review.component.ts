import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() reviewer = 'John Doe';
  @Input() reviewDate = '07 March 2022';
  @Input() fullStars = 4;
  @Input() halfStars = 1;
  @Input() isLast: boolean = false;
  @Input() comment = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ipsam quaerat nemo explicabo facere doloremque quos blanditiis, aliquid veniam soluta, eaque reprehenderit atque dolor commodi quod dignissimos quae sint? Earum?';


  constructor() { }

  ngOnInit(): void {
  }

}
