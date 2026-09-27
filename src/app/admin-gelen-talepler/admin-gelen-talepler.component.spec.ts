import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGelenTaleplerComponent } from './admin-gelen-talepler.component';

describe('AdminGelenTaleplerComponent', () => {
  let component: AdminGelenTaleplerComponent;
  let fixture: ComponentFixture<AdminGelenTaleplerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGelenTaleplerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGelenTaleplerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
