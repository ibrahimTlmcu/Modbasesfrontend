import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowyMoonComponent } from './snowy-moon.component';

describe('SnowyMoonComponent', () => {
  let component: SnowyMoonComponent;
  let fixture: ComponentFixture<SnowyMoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnowyMoonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnowyMoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
