import { CustomerDetails } from 'src/app/models/Customer-Details';
import { OrderStatusEnum } from '../enums/OrderStatus';

export class OrderDetailsSummary {
  trackingId: string;
  netTotal: string;
  status: OrderStatusEnum;
  itemsCount: number;
  customerDetails: CustomerDetails;

  constructor(
    trackingId: string,
    netTotal: string,
    status: OrderStatusEnum,
    itemsCount: number,
    customerDetails: CustomerDetails
  ) {
    this.trackingId = trackingId;
    this.netTotal = netTotal;
    this.status = status;
    this.itemsCount = itemsCount;
    this.customerDetails = customerDetails;
  }
}
