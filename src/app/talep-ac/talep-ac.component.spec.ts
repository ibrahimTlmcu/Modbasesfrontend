import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalepAcComponent } from './talep-ac.component';

describe('TalepAcComponent', () => {
  let component: TalepAcComponent;
  let fixture: ComponentFixture<TalepAcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalepAcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalepAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
