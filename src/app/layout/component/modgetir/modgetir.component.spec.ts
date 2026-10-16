import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModgetirComponent } from './modgetir.component';

describe('ModgetirComponent', () => {
  let component: ModgetirComponent;
  let fixture: ComponentFixture<ModgetirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModgetirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModgetirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
