import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CevapGetirComponent } from './cevap-getir.component';

describe('CevapGetirComponent', () => {
  let component: CevapGetirComponent;
  let fixture: ComponentFixture<CevapGetirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CevapGetirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CevapGetirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
