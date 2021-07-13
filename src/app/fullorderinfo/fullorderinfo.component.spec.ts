import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullorderinfoComponent } from './fullorderinfo.component';

describe('FullorderinfoComponent', () => {
  let component: FullorderinfoComponent;
  let fixture: ComponentFixture<FullorderinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullorderinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullorderinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
