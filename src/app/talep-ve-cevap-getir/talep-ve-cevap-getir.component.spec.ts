import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalepVeCevapGetirComponent } from './talep-ve-cevap-getir.component';

describe('TalepVeCevapGetirComponent', () => {
  let component: TalepVeCevapGetirComponent;
  let fixture: ComponentFixture<TalepVeCevapGetirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalepVeCevapGetirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalepVeCevapGetirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
