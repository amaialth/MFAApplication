import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayQrComponent } from './display-qr.component';

describe('DisplayQrComponent', () => {
  let component: DisplayQrComponent;
  let fixture: ComponentFixture<DisplayQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayQrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
