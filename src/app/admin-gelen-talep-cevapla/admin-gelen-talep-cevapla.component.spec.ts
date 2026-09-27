import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGelenTalepCevaplaComponent } from './admin-gelen-talep-cevapla.component';

describe('AdminGelenTalepCevaplaComponent', () => {
  let component: AdminGelenTalepCevaplaComponent;
  let fixture: ComponentFixture<AdminGelenTalepCevaplaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGelenTalepCevaplaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGelenTalepCevaplaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
