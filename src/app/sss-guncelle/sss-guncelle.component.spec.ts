import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SssGuncelleComponent } from './sss-guncelle.component';

describe('SssGuncelleComponent', () => {
  let component: SssGuncelleComponent;
  let fixture: ComponentFixture<SssGuncelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SssGuncelleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SssGuncelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
