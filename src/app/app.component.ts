import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'snkrs';
  events: string[] = [];
  opened: boolean = false;

  get isBadgeHidden(): boolean {
    return this._customerService.customer.cartItems.length === 0 || !this._authService.isLoggedIn;
  }

  constructor(_router: Router, public _authService: AuthService, public _customerService: CustomerService) {
    _router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(_ => this.opened = false);
  }

}
