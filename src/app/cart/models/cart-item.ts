export class CartItem {
  productId: string;
  size: string;
  quantity: number;

  constructor(productId: string, size: string, quantity: number) {
    this.productId = productId;
    this.size = size;
    this.quantity = quantity;
  }
}
