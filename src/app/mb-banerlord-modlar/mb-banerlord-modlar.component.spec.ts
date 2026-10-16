import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbBanerlordModlarComponent } from './mb-banerlord-modlar.component';

describe('MbBanerlordModlarComponent', () => {
  let component: MbBanerlordModlarComponent;
  let fixture: ComponentFixture<MbBanerlordModlarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbBanerlordModlarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MbBanerlordModlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
