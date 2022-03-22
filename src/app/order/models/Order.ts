import { CartItem } from 'src/app/cart/models/cart-item';
import { CustomerDetails } from 'src/app/models/Customer-Details';
import { OrderStatusEnum } from '../enums/OrderStatus';

export class OrderItem {
  id: string;
  trackingId: string;
  cartItems: CartItem[];
  netTotal: string;
  status: OrderStatusEnum;
  orderedDate: string;
  customerDetails: CustomerDetails;

  constructor(
    id: string,
    trackingId: string,
    cartItems: CartItem[],
    netTotal: string,
    status: OrderStatusEnum,
    orderedDate: string,
    customerDetails: CustomerDetails
  ) {
    this.id = id;
    this.trackingId = trackingId;
    this.cartItems = cartItems;
    this.netTotal = netTotal;
    this.status = status;
    this.orderedDate = orderedDate;
    this.customerDetails = customerDetails;
  }
}
