import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  private routeSub?: Subscription;
  constructor(private route: ActivatedRoute, public _orderService: OrderService) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this._orderService.getOrderDetails(params['id']);
    });
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }
}
