import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherMfaComponent } from './other-mfa.component';

describe('OtherMfaComponent', () => {
  let component: OtherMfaComponent;
  let fixture: ComponentFixture<OtherMfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherMfaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherMfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
