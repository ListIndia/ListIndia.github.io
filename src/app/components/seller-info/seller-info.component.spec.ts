import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerInfoComponent } from './seller-info.component';

describe('SellerInfoComponent', () => {
  let component: SellerInfoComponent;
  let fixture: ComponentFixture<SellerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
