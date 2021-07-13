import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseupdateprofileComponent } from './chooseupdateprofile.component';

describe('ChooseupdateprofileComponent', () => {
  let component: ChooseupdateprofileComponent;
  let fixture: ComponentFixture<ChooseupdateprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseupdateprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseupdateprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
