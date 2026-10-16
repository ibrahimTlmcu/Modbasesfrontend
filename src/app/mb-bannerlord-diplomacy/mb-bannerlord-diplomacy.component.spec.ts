import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbBannerlordDiplomacyComponent } from './mb-bannerlord-diplomacy.component';

describe('MbBannerlordDiplomacyComponent', () => {
  let component: MbBannerlordDiplomacyComponent;
  let fixture: ComponentFixture<MbBannerlordDiplomacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbBannerlordDiplomacyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MbBannerlordDiplomacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
