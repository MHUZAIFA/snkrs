import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderItem } from '../models/Order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  outletActivated = false;
  displayedColumns: string[] = [
    'id',
    'items',
    'netTotal',
    'status',
    'orderDate',
  ];
  dataSource: MatTableDataSource<OrderItem>;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(public _orderService: OrderService) {
    this.dataSource = new MatTableDataSource();
    this._orderService.orders$.subscribe((orders) => {
      console.log(orders)
      this.dataSource = new MatTableDataSource(orders);
      this.dataSource.paginator = this.paginator as MatPaginator;
      this.dataSource.sort = this.sort as MatSort;
    });
  }

  ngOnInit(): void {
    this._orderService.getOrders();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
