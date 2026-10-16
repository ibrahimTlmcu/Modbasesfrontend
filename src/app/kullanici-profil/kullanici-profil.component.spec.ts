import { ComponentFixture, TestBed } from '@angular/core/testing';

import KullaniciProfilComponent from './kullanici-profil.component';

describe('KullaniciProfilComponent', () => {
  let component: KullaniciProfilComponent;
  let fixture: ComponentFixture<KullaniciProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KullaniciProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KullaniciProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
