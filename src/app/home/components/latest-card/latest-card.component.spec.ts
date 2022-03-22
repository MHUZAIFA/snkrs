import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestCardComponent } from './latest-card.component';

describe('LatestCardComponent', () => {
  let component: LatestCardComponent;
  let fixture: ComponentFixture<LatestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
