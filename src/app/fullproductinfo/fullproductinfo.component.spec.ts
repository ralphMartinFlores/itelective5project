import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullproductinfoComponent } from './fullproductinfo.component';

describe('FullproductinfoComponent', () => {
  let component: FullproductinfoComponent;
  let fixture: ComponentFixture<FullproductinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullproductinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullproductinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
