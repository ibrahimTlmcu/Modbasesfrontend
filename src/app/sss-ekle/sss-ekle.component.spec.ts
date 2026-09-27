import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SssEkleComponent } from './sss-ekle.component';

describe('SssEkleComponent', () => {
  let component: SssEkleComponent;
  let fixture: ComponentFixture<SssEkleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SssEkleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SssEkleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
