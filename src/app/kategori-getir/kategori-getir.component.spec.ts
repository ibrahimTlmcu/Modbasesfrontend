import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategoriGetirComponent } from './kategori-getir.component';

describe('KategoriGetirComponent', () => {
  let component: KategoriGetirComponent;
  let fixture: ComponentFixture<KategoriGetirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KategoriGetirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KategoriGetirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
