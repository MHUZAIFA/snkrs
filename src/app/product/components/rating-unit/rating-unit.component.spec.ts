import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingUnitComponent } from './rating-unit.component';

describe('RatingUnitComponent', () => {
  let component: RatingUnitComponent;
  let fixture: ComponentFixture<RatingUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
