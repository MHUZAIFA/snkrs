import { CartItem } from "../cart/models/cart-item";

export class Customer {
  emailId: string = ''; // logged In Customer
  wishlistItems: string[] = []; // stores ids of products added to the wishlist
  cartItems: CartItem[] = []; // stores cart info of products added to the cart
  orders: string[] = []; // stores order Id's
}
