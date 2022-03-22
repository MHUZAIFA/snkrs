import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedProductCardComponent } from './ordered-product-card.component';

describe('OrderedProductCardComponent', () => {
  let component: OrderedProductCardComponent;
  let fixture: ComponentFixture<OrderedProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderedProductCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
