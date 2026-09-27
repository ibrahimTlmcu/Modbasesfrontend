import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SssGetirComponent } from './sss-getir.component';

describe('SssGetirComponent', () => {
  let component: SssGetirComponent;
  let fixture: ComponentFixture<SssGetirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SssGetirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SssGetirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
