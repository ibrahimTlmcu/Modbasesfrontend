import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GercekciFizikComponent } from './gercekci-fizik.component';

describe('GercekciFizikComponent', () => {
  let component: GercekciFizikComponent;
  let fixture: ComponentFixture<GercekciFizikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GercekciFizikComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GercekciFizikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
