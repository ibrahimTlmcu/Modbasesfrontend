import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ets2ModlarComponent } from './ets2-modlar.component';

describe('Ets2ModlarComponent', () => {
  let component: Ets2ModlarComponent;
  let fixture: ComponentFixture<Ets2ModlarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ets2ModlarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ets2ModlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
