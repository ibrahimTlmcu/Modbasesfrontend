import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategoriEkleComponent } from './kategori-ekle.component';

describe('KategoriEkleComponent', () => {
  let component: KategoriEkleComponent;
  let fixture: ComponentFixture<KategoriEkleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KategoriEkleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KategoriEkleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
